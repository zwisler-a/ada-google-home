import { Injectable, Logger } from '@nestjs/common';
import { NodeDefinition } from '../node/node-definition';
import { RemoteApiService } from './remote-api.service';
import { AmqpService } from './amqp.service';
import { NodeInstance } from '../node/node-instance-definition';
import { IOEvent } from '../events/io.event';
import { filter, Subscription } from 'rxjs';
import { InputEvent } from '../events/input.event';
import { AttributeEvent } from '../events/attribute.event';

@Injectable()
export class NodeRegisterService {
  private logger = new Logger(NodeRegisterService.name);

  constructor(
    private amqp: AmqpService,
    private apiService: RemoteApiService,
  ) {}

  private instances: { [nodeInstanceId: string]: NodeInstance } = {};

  async register(
    nodes: NodeDefinition[],
    connectorId: string,
    name: string,
    description: string,
  ) {
    await this.amqp.ready;
    nodes.forEach((node) => {
      const instanceSubscriptions = new Subscription();

      this.apiService
        .createInstanceCreateObservable(connectorId, node.identifier)
        .subscribe((event) => {
          this.logger.debug(`Creating instance of ${node.name}`);
          const instance = node.createInstance();
          instance.identifier = event.nodeInstanceIdentifier;
          this.instances[instance.identifier] = instance;
          const instance$ = this.apiService.createInstanceObservable(
            connectorId,
            instance.identifier,
          );
          instanceSubscriptions.add(
            instance$
              .pipe(filter((ev: IOEvent) => ev.type === 'INPUT'))
              .subscribe((ev: InputEvent) => {
                instance.handleInput(ev.inputIdentifier, ev.value);
              }),
          );

          instanceSubscriptions.add(
            instance$
              .pipe(filter((ev: IOEvent) => ev.type === 'ATTRIBUTE'))
              .subscribe((ev: AttributeEvent) => {
                instance.changeAttribute(ev.attributeIdentifier, ev.value);
              }),
          );

          instance.updateAttribute = (identifier, value) => {
            this.apiService.updateAttribute(
              connectorId,
              instance.identifier,
              identifier,
              value,
            );
          };
          instance.updateOutput = (identifier, value) => {
            this.apiService.updateOutput(
              connectorId,
              instance.identifier,
              identifier,
              value,
            );
          };
        });
      this.apiService
        .createInstanceDestroyObservable(connectorId, node.identifier)
        .subscribe((event) => {
          this.instances[event.nodeInstanceIdentifier].deconstruct();
          instanceSubscriptions.unsubscribe();
        });
    });
    this.amqp.sendConnector({
      name: name,
      description: description,
      identifier: connectorId,
      nodes: nodes,
    });
  }
}

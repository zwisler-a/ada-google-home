import { Injectable } from '@nestjs/common';
import { AmqpService } from './amqp.service';
import { InputEvent } from '../events/input.event';
import { AttributeEvent } from '../events/attribute.event';
import { filter } from 'rxjs';
import { OutputEvent } from '../events/output.event';
import { CreateInstanceEvent } from '../events/create-instance.event';
import { DestroyInstanceEvent } from '../events/destroy-instance.event';

@Injectable()
export class RemoteApiService {
  constructor(private amqp: AmqpService) {}

  createInstanceObservable(connectorId: string, instanceId: string) {
    return this.amqp.ioEvents$.pipe(
      filter(
        (io) =>
          io.connectorIdentifier === connectorId &&
          io.nodeInstanceIdentifier === instanceId,
      ),
    );
  }

  createInstanceCreateObservable(connectorId: string, definition: string) {
    return this.amqp.ioEvents$.pipe(
      filter((io) => io.type === 'CREATE'),
      filter(
        (io: CreateInstanceEvent) =>
          io.connectorIdentifier === connectorId &&
          io.definitionIdentifier === definition,
      ),
    );
  }

  createInstanceDestroyObservable(connectorId: string, instance: string) {
    return this.amqp.ioEvents$.pipe(
      filter((io) => io.type === 'DESTROY'),
      filter(
        (io: DestroyInstanceEvent) =>
          io.connectorIdentifier === connectorId &&
          io.nodeInstanceIdentifier === instance,
      ),
    );
  }

  updateOutput(
    connectorIdentifier: string,
    nodeInstanceIdentifier: string,
    outputIdentifier: string,
    data: string,
  ) {
    const event: OutputEvent = {
      type: 'OUTPUT',
      connectorIdentifier,
      nodeInstanceIdentifier,
      outputIdentifier,
      value: data,
    };
    this.amqp.sendIO(event);
  }

  updateAttribute(
    connectorIdentifier: string,
    nodeInstanceIdentifier: string,
    attributeIdentifier: string,
    data: string,
  ) {
    const event: AttributeEvent = {
      type: 'ATTRIBUTE',
      connectorIdentifier,
      nodeInstanceIdentifier,
      attributeIdentifier,
      value: data,
    };
    this.amqp.sendIO(event);
  }
}

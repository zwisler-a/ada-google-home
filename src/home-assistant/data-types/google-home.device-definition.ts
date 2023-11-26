import {
  mapTraitToNodeOutputDefinition,
  mapTraitToNodeInputDefinition,
} from '../mapper/trait-to-sensor.mapper';
import { GoogleDeviceDto } from './google-device.dto';
import {
  Identifiable,
  NodeAttributeDefinition,
  NodeDefinition,
  NodeInputDefinition,
  NodeInstance,
  NodeOutputDefinition,
  NodeState,
} from '@zwisler/ada-lib';
import { GoogleHomeDeviceInstance } from './google-home.device-instance';

export class GoogleHomeDeviceDefinition extends NodeDefinition {
  attributes: NodeAttributeDefinition[] = [];
  outputs: NodeOutputDefinition[] = mapTraitToNodeOutputDefinition(
    this.googleDevice.traits,
  );
  inputs: NodeInputDefinition[] = mapTraitToNodeInputDefinition(
    this.googleDevice.traits,
  );

  private instances: NodeInstance[] = [];

  constructor(private googleDevice: GoogleDeviceDto) {
    super({
      identifier: googleDevice.id,
      name: googleDevice.name.name,
      description: googleDevice.name.name,
    });
  }

  executeCommand(command: string, data: any) {
    const output = this.outputs.find((o) => (o.identifier = command));
    if (output) this.updateOutput(output.identifier, data);
  }

  async createInstance(
    state: NodeState,
    identifiable: Identifiable,
  ): Promise<NodeInstance> {
    const instance = new GoogleHomeDeviceInstance(identifiable, this, state);
    this.instances.push(instance);
    return instance;
  }

  private updateOutput(identifier: string, data: any) {
    this.instances.forEach((instance) =>
      instance.updateOutput(identifier, data),
    );
  }

  unregister(param: GoogleHomeDeviceInstance) {
    this.instances = this.instances.filter(
      (i) => i.identifier !== param.identifier,
    );
  }
}

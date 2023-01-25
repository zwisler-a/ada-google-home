import {
  mapTraitToNodeInputDefinition,
  mapTraitToNodeOutputDefinition,
} from '../mapper/trait-to-sensor.mapper';
import { GoogleDeviceDto } from './google-device.dto';
import { Identifiable } from '../../smart/node/identifiable';
import { NodeSingletonDefinition } from '../../smart/node/node-singleton-definition';

export class GoogleHomeDevice extends NodeSingletonDefinition {
  identifier = this.googleDevice.id;
  name = this.googleDevice.name.name;
  description = this.googleDevice.name.name;

  attributes: Identifiable[] = [];
  inputs: Identifiable[] = mapTraitToNodeInputDefinition(
    this.googleDevice.traits,
  );
  outputs: Identifiable[] = mapTraitToNodeOutputDefinition(
    this.googleDevice.traits,
  );

  constructor(private googleDevice: GoogleDeviceDto) {
    super();
  }

  executeCommand(command: string, data: any) {
    const output = this.outputs.find((o) => (o.identifier = command));
    if (output) this.updateOutput(output.identifier, data);
  }

  handleInput(input: string, data: any) {
    console.log(input, data);
    this.updateOutput(
      'devices.ThermostatTemperatureSetpoint',
      'from other service',
    );
  }
}

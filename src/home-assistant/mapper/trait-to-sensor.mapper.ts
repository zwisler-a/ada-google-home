import { GoogleDeviceTrait } from '../data-types/google-device.enums';
import { NodeInputDefinition, NodeOutputDefinition } from '@zwisler/ada-lib';

export function mapTraitToNodeInputDefinition(
  traits: GoogleDeviceTrait[] | string[],
): NodeInputDefinition[] {
  const outputs: NodeInputDefinition[] = [];

  traits.forEach((trait) => {
    if (trait === GoogleDeviceTrait.TemperatureSetting) {
      outputs.push(
        NodeInputDefinition.from(
          'devices.ThermostatTemperatureSetpoint',
          'Temperature',
          'Temperature',
        ),
      );
    }
  });

  return outputs;
}

export function mapTraitToNodeOutputDefinition(
  traits: GoogleDeviceTrait[] | string[],
): NodeOutputDefinition[] {
  const nodeOutputDefinitions: NodeOutputDefinition[] = [];

  traits.forEach((trait) => {
    if (trait === GoogleDeviceTrait.OnOff) {
      nodeOutputDefinitions.push(
        NodeOutputDefinition.from(
          'action.devices.commands.OnOff',
          'On/Off',
          'Description',
        ),
      );
    }
    if (trait === GoogleDeviceTrait.TemperatureSetting) {
      nodeOutputDefinitions.push(
        NodeOutputDefinition.from(
          'action.devices.commands.ThermostatTemperatureSetpoint',
          'Set Temperature',
          'Set Temperature',
        ),
      );
    }
  });

  return nodeOutputDefinitions;
}

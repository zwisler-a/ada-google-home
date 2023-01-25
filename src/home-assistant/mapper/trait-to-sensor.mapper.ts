import { GoogleDeviceTrait } from '../data-types/google-device.enums';
import { Identifiable } from '../../smart/node/identifiable';

export function mapTraitToNodeOutputDefinition(
  traits: GoogleDeviceTrait[] | string[],
): Identifiable[] {
  const outputs: Identifiable[] = [];

  traits.forEach((trait) => {
    if (trait === GoogleDeviceTrait.TemperatureSetting) {
      outputs.push(
        Identifiable.from(
          'devices.ThermostatTemperatureSetpoint',
          'Temperature',
          'Temperature',
        ),
      );
    }
  });

  return outputs;
}

export function mapTraitToNodeInputDefinition(
  traits: GoogleDeviceTrait[] | string[],
): Identifiable[] {
  const nodeOutputDefinitions: Identifiable[] = [];

  traits.forEach((trait) => {
    if (trait === GoogleDeviceTrait.OnOff) {
      nodeOutputDefinitions.push(
        Identifiable.from(
          'action.devices.commands.OnOff',
          'On/Off',
          'Description',
        ),
      );
    }
    if (trait === GoogleDeviceTrait.TemperatureSetting) {
      nodeOutputDefinitions.push(
        Identifiable.from(
          'action.devices.commands.ThermostatTemperatureSetpoint',
          'Set Temperature',
          'Set Temperature',
        ),
      );
    }
  });

  return nodeOutputDefinitions;
}

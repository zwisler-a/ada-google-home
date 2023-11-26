import { Identifiable, NodeInstance, NodeState } from '@zwisler/ada-lib';
import { GoogleHomeDeviceDefinition } from './google-home.device-definition';

export class GoogleHomeDeviceInstance extends NodeInstance {
  constructor(
    identifiable: Identifiable,
    public definition: GoogleHomeDeviceDefinition,
    state: NodeState,
  ) {
    super(identifiable, definition, state);
  }

  handleInput(input: string, data: any) {
    // Noop
  }

  deconstruct() {
    this.definition.unregister(this);
  }
}

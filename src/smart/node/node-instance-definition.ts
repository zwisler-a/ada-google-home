import { Identifiable } from './identifiable';

export abstract class NodeInstance extends Identifiable {
  private attributes = {};

  abstract handleInput(identifier: string, data: any);

  changeAttribute(identifier: string, data: any) {
    this.attributes[identifier] = data;
    this.onAttributeChange(identifier, data);
  }

  abstract onAttributeChange(identifier: string, data: any);

  getAttribute(identifier: string) {
    return this.attributes[identifier];
  }

  updateOutput: (identifier: string, data: any) => void;

  updateAttribute: (identifier: string, data: any) => void;

  deconstruct() {
    // NOOP
  }
}

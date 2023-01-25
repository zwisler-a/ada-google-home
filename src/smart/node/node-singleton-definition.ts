import { Identifiable } from './identifiable';
import { NodeInstance } from './node-instance-definition';

class CallbackInstance extends NodeInstance {
  constructor(private definition: NodeSingletonDefinition) {
    super();
  }

  handleInput(identifier: string, data: any) {
    this.definition.handleInput(identifier, data);
  }

  onAttributeChange(identifier: string, data: any) {
    this.definition.onAttributeChange(identifier, data);
  }
}

export abstract class NodeSingletonDefinition {
  private instances = [];
  abstract attributes: Identifiable[];

  abstract inputs: Identifiable[];

  abstract outputs: Identifiable[];

  createInstance() {
    const instance = new CallbackInstance(this);
    this.instances.push(instance);
    return instance;
  }

  updateAttribute(identifier: string, value: any) {
    this.instances.forEach((instance) =>
      instance.updateAttribute(identifier, value),
    );
  }

  updateOutput(identifier: string, value: any) {
    this.instances.forEach((instance) =>
      instance.updateOutput(identifier, value),
    );
  }

  handleInput(identifier: string, data: any) {}

  onAttributeChange(identifier: string, data: any) {}
}

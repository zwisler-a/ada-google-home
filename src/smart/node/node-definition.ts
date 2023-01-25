import { Identifiable } from './identifiable';
import { NodeInstance } from './node-instance-definition';

export abstract class NodeDefinition extends Identifiable {
  abstract attributes: Identifiable[];

  abstract inputs: Identifiable[];

  abstract outputs: Identifiable[];

  abstract createInstance(): NodeInstance;
}

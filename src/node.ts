import {forEach, mapValues} from 'lodash';
import {FlowIOConnection, FlowIORegister, FlowIOSet} from './io';
import {FlowNodeType} from './nodeType';

export class FlowNode<I extends FlowIOSet, O extends FlowIOSet> {
  public id: string;
  public type: FlowNodeType<I, O>;

  public inputs: FlowIORegister<I>;
  public outputs: FlowIORegister<O>;

  public constructor(id: string, type: FlowNodeType<I, O>) {
    this.id = id;
    this.type = type;

    this.inputs = mapValues(this.type.inputs, (value, key: keyof I) => {
      return {
        value: value.default,
      };
    }) as FlowIORegister<I>;

    this.outputs = mapValues(this.type.outputs, (value, key: keyof O) => {
      return {
        value: value.default,
      };
    }) as FlowIORegister<O>;
  }

  public input<K extends keyof I>(key: K, value: I[K]): void {
    const io = this.inputs[key];

    if (io === undefined) {
      return;
    }

    io.value = value;
  }

  public output<K extends keyof O>(key: K): O[K] {
    const io = this.outputs[key];

    if (io.value instanceof FlowIOConnection) {
      return io.value.node.output(io.value.output) as O[K];
    }

    return io.value;
  }

  public process() {
    this.type.handler(
      key => {
        const input = this.inputs[key];

        if (input.value instanceof FlowIOConnection) {
          return input.value.node.output(input.value.output) as I[keyof I];
        }

        return input.value;
      },
      (key, value) => {
        this.outputs[key].value = value;
      }
    );
  }
}

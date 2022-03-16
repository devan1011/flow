import {FlowIODef, FlowIOSet} from './io';

export type FlowNodeHandler<I, O> = (
  input: <K extends keyof I>(key: K) => I[K],
  output: <K extends keyof O>(key: K, value: O[K]) => void
) => void;

export class FlowNodeType<I extends FlowIOSet, O extends FlowIOSet> {
  public name: string;

  public inputs: FlowIODef<I>;
  public outputs: FlowIODef<O>;

  public handler: FlowNodeHandler<I, O>;

  public constructor(
    name: string,
    inputs: FlowIODef<I>,
    outputs: FlowIODef<O>,
    handler: FlowNodeHandler<I, O>
  ) {
    this.name = name;
    this.inputs = inputs;
    this.outputs = outputs;
    this.handler = handler;
  }
}

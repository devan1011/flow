import { FlowNode } from "./node";

export class FlowIOConnection {
  node: FlowNode<FlowIOSet, FlowIOSet>;
  output: string;

  constructor(
    node: FlowIOConnection['node'],
    output: FlowIOConnection['output']
  ) {
    this.node = node;
    this.output = output;
  }
}

export interface FlowIO<T> {
  value: T | FlowIOConnection;
}

export type FlowIODef<T extends FlowIOSet> = {
  [K in keyof T]: {
    type: new () => T[K];
    default: T[K];
  };
};

export type FlowIOSet = Record<string, unknown>;

export type FlowIORegister<T extends FlowIOSet> = {
  [K in keyof T]: FlowIO<T[K]>;
};

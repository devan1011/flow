interface FlowIO {
  value: any | FlowNode<any, any>;
}

type FlowIORegister<T extends string> = Record<T, FlowIO>;

interface FlowNode<I extends string, O extends string> {
  id: string;
  inputs: FlowIORegister<I>;
  outputs: FlowIORegister<O>;
  handler: (inputs: FlowIORegister<I>) => FlowIORegister<O>;
  process: () => FlowNode<I, O>;

  setHandler(handler: FlowNode<I, O>['handler']): FlowNode<I, O>;
}

const process = (node: FlowNode<any, any>) => {
  if (node.outputs !== undefined) {
    return node.outputs;
  }

  return node.handler(node.inputs);
};

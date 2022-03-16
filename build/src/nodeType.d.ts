import { FlowIODef, FlowIOSet } from './io';
export declare type FlowNodeHandler<I, O> = (input: <K extends keyof I>(key: K) => I[K], output: <K extends keyof O>(key: K, value: O[K]) => void) => void;
export declare class FlowNodeType<I extends FlowIOSet, O extends FlowIOSet> {
    name: string;
    inputs: FlowIODef<I>;
    outputs: FlowIODef<O>;
    handler: FlowNodeHandler<I, O>;
    constructor(name: string, inputs: FlowIODef<I>, outputs: FlowIODef<O>, handler: FlowNodeHandler<I, O>);
}

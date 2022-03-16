import { FlowIORegister, FlowIOSet } from './io';
import { FlowNodeType } from './nodeType';
export declare class FlowNode<I extends FlowIOSet, O extends FlowIOSet> {
    id: string;
    type: FlowNodeType<I, O>;
    inputs: FlowIORegister<I>;
    outputs: FlowIORegister<O>;
    constructor(id: string, type: FlowNodeType<I, O>);
    input<K extends keyof I>(key: K, value: I[K]): void;
    output<K extends keyof O>(key: K): O[K] | undefined;
    process(): void;
}

export interface FlowIO<T> {
    value: T;
}
export declare type FlowIODef<T extends FlowIOSet> = {
    [K1 in keyof T]: {
        type: new () => T[K1];
        default: T[K1];
    };
};
export declare type FlowIOSet = Record<string, unknown>;
export declare type FlowIORegister<T extends FlowIOSet> = {
    [K2 in keyof T]: {
        value: T[K2];
    };
};

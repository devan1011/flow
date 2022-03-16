"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("./node");
const nodeType_1 = require("./nodeType");
console.log('Hello There!');
const nodeAType = new nodeType_1.FlowNodeType('A', {
    a: { type: String, default: 'test' },
    b: { type: Number, default: 0 },
}, {
    a: { type: String, default: 'unchanged' },
    b: { type: String, default: 'unchanged' },
}, (input, output) => {
    output('a', 'Hello There!');
    output('b', `${input('a')}-${input('b')}`);
});
console.log(nodeAType);
const nodeA = new node_1.FlowNode('node-a', nodeAType);
nodeA.input('a', 'hello');
nodeA.input('b', 123);
nodeA.process();
console.log(nodeA.output('a'), nodeA.output('b'));
//# sourceMappingURL=index.js.map
import {FlowNode} from './node';
import {FlowNodeType} from './nodeType';

console.log('Hello There!');

const nodeAType = new FlowNodeType<
  {
    a: String;
    b: Number;
  },
  {
    a: String;
    b: String;
  }
>(
  'A',
  {
    a: {type: String, default: 'test'},
    b: {type: Number, default: 0},
  },
  {
    a: {type: String, default: 'unchanged'},
    b: {type: String, default: 'unchanged'},
  },
  (input, output) => {
    output('a', 'Hello There!');
    output('b', `${input('a')}-${input('b')}`);
  }
);

console.log(nodeAType);

const nodeA = new FlowNode('node-a', nodeAType);

nodeA.input('a', 'hello');
nodeA.input('b', 123);
nodeA.process();

console.log(nodeA.output('a'), nodeA.output('b'));

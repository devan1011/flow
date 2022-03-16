"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowNode = void 0;
const lodash_1 = require("lodash");
class FlowNode {
    constructor(id, type) {
        this.id = id;
        this.type = type;
        this.inputs = (0, lodash_1.mapValues)(this.type.inputs, (value, key) => {
            return {
                value: value.default,
            };
        });
        this.outputs = (0, lodash_1.mapValues)(this.type.outputs, (value, key) => {
            return {
                value: value.default,
            };
        });
    }
    input(key, value) {
        const io = this.inputs[key];
        if (io === undefined) {
            return;
        }
        io.value = value;
    }
    output(key) {
        const io = this.outputs[key];
        if (io === undefined) {
            return undefined;
        }
        return io.value;
    }
    process() {
        this.type.handler(key => {
            return this.inputs[key].value;
        }, (key, value) => {
            this.outputs[key].value = value;
        });
    }
}
exports.FlowNode = FlowNode;
//# sourceMappingURL=node.js.map
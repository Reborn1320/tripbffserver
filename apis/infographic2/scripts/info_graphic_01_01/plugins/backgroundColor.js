"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
function backgroundColor(baseFuncs, canvasAdaptor, blockConfig, cursor) {
    // console.log("backgroundColor", blockConfig);
    const { backgroundColor } = blockConfig;
    if (backgroundColor) {
        // console.log("backgroundColor", backgroundColor);
        const { x, y, width, height } = cursor;
        console.log(`cursor${x} ${y} ${width} ${height}`);
        //todo use fillColor in the current layer
        canvasAdaptor.drawRect({
            x,
            y,
            width,
            height,
            backgroundColor
        });
    }
    if (_.isEmpty(baseFuncs))
        return cursor;
    const lastBaseFunc = baseFuncs[baseFuncs.length - 1];
    return lastBaseFunc(baseFuncs.slice(0, baseFuncs.length - 1), canvasAdaptor, blockConfig, cursor);
}
exports.backgroundColor = backgroundColor;

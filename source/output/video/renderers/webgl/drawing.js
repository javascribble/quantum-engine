//const type = context.UNSIGNED_SHORT; //context.UNSIGNED_BYTE;
//export const drawPointArrays = (context) => drawArrays(context.POINTS);
//export const drawLineArrays = (context) => drawArrays(context.LINES);
//export const drawLineLoopArrays = (context) => drawArrays(context.LINE_LOOP);
//export const drawLineStripArrays = (context) => drawArrays(context.LINE_STRIP);
//export const drawTriangleArrays = (context) => drawArrays(context.TRIANGLES);
//export const drawTriangleFanArrays = (context) => drawArrays(context.TRIANGLE_FAN);
export const drawTriangleStripArrays = (context) => drawArrays(context.TRIANGLE_STRIP);
//export const drawPointArraysInstanced = (context) => drawArraysInstanced(context.POINTS);
//export const drawLineArraysInstanced = (context) => drawArraysInstanced(context.LINES);
//export const drawLineLoopArraysInstanced = (context) => drawArraysInstanced(context.LINE_LOOP);
//export const drawLineStripArraysInstanced = (context) => drawArraysInstanced(context.LINE_STRIP);
//export const drawTriangleArraysInstanced = (context) => drawArraysInstanced(context.TRIANGLES);
//export const drawTriangleFanArraysInstanced = (context) => drawArraysInstanced(context.TRIANGLE_FAN);
export const drawTriangleStripArraysInstanced = (context) => drawArraysInstanced(context.TRIANGLE_STRIP);
//export const drawPointElements = (context) => drawElements(context.POINTS, type);
//export const drawLineElements = (context) => drawElements(context.LINES, type);
//export const drawLineLoopElements = (context) => drawElements(context.LINE_LOOP, type);
//export const drawLineStripElements = (context) => drawElements(context.LINE_STRIP, type);
//export const drawTriangleElements = (context) => drawElements(context.TRIANGLES, type);
//export const drawTriangleFanElements = (context) => drawElements(context.TRIANGLE_FAN, type);
//export const drawTriangleStripElements = (context) => drawElements(context.TRIANGLE_STRIP, type);
//export const drawPointElementsInstanced = (context) => drawElementsInstanced(context.POINTS, type);
//export const drawLineElementsInstanced = (context) => drawElementsInstanced(context.LINES, type);
//export const drawLineLoopElementsInstanced = (context) => drawElementsInstanced(context.LINE_LOOP, type);
//export const drawLineStripElementsInstanced = (context) => drawElementsInstanced(context.LINE_STRIP, type);
//export const drawTriangleElementsInstanced = (context) => drawElementsInstanced(context.TRIANGLES, type);
//export const drawTriangleFanElementsInstanced = (context) => drawElementsInstanced(context.TRIANGLE_FAN, type);
//export const drawTriangleStripElementsInstanced = (context) => drawElementsInstanced(context.TRIANGLE_STRIP, type);

function drawArrays(context, mode) {
    return function (offset, count) {
        context.drawArrays(mode, offset, count);
    };
}

//function drawElements(context, mode, type) {
//    return function (offset, count) {
//        context.drawElements(mode, count, type, offset);
//    };
//}

function drawArraysInstanced(context, mode) {
    return function (offset, count, instances) {
        context.drawArraysInstanced(mode, offset, count, instances);
    };
}

//function drawElementsInstanced(context, mode, type) {
//    return function (offset, count, instances) {
//        context.drawElementsInstanced(mode, count, type, offset, instances);
//    };
//}
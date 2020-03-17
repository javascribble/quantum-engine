export function encloseDrawArrays(context, mode) {
    return function (offset, count) {
        context.drawArrays(mode, offset, count);
    };
}

export function encloseDrawElements(context, mode, type) {
   return function (offset, count) {
       context.drawElements(mode, count, type, offset);
   };
}

export function encloseDrawArraysInstanced(context, mode) {
    return function (offset, count, instances) {
        context.drawArraysInstanced(mode, offset, count, instances);
    };
}

export function encloseDrawElementsInstanced(context, mode, type) {
   return function (offset, count, instances) {
       context.drawElementsInstanced(mode, count, type, offset, instances);
   };
}
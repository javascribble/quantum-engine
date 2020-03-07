export function createBuffer(context, target, usage, data) {
    let buffer = {
        target,
        usage,
        data
    };

    applyBuffer(buffer, context);
    return buffer;
}

export function applyBuffer(buffer, context) {
    buffer.offset = 0;
    buffer.changed = !!buffer.data;
    buffer.target = context[buffer.target] || buffer.target || context.ARRAY_BUFFER;
    buffer.usage = context[buffer.usage] || buffer.usage || context.STATIC_DRAW;
    
    restoreBuffer(buffer, context);
    context.buffers.add(buffer);
}

export function restoreBuffer(buffer, context) {
    buffer.handle = context.createBuffer();
}

export function bindBuffer(buffer, context) {
    context.bindBuffer(buffer.target, buffer.handle);
}

export function bufferData(buffer, context) {
    if(buffer.offset) {
        context.bufferSubData(buffer.target, buffer.offset, buffer.data);
    } else {
        context.bufferData(buffer.target, buffer.data, buffer.usage);
    }
}

export function deleteBuffer(buffer, context) {
    context.buffers.delete(buffer);
    context.deleteBuffer(buffer.handle);
}

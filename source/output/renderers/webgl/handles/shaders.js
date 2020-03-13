export function createShader(context, source, type) {
    const shader = {
        source,
        type
    };

    applyShader(shader, context);
    return shader;
}

export function applyShader(shader, context) {
    restoreShader(shader, context);
    context.shaders.add(shader);
}

export function restoreShader(shader, context) {
    const handle = shader.handle = context.createShader(shader.type);
    context.shaderSource(handle, shader.source);
    context.compileShader(handle);
    if (!context.getShaderParameter(handle, context.COMPILE_STATUS)) {
        throw context.getShaderInfoLog(handle);
    }
}

export function deleteShader(shader, context) {
    context.shaders.delete(shader);
    context.deleteShader(shader.handle);
}

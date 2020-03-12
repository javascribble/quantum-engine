export const defaultCanvasOptions = {
    alpha: false,
    depth: true,
    stencil: false,
    antialias: false,
    desynchronized: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
};

export function createCanvas() {
    return document.createElement('canvas');
}

export function createCanvasContext(options) {
    return canvas.getContext('2d', options);
}

export function createWebGLContext(options) {
    return canvas.getContext('webgl2', options)
        || canvas.getContext('webgl', options)
        || canvas.getContext('experimental-webgl', options);
}

export function createWebGPUContext(options) {
    return canvas.getContext('gpu', options)
        || canvas.getContext('gpupresent', options);
}

export function resizeCanvas(canvas, scale) {
    const scaledWidth = canvas.clientWidth * scale;
    const scaledHeight = canvas.clientHeight * scale;
    if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        return true;
    }

    return false;
}

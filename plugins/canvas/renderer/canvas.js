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

export function getCanvasContext(canvas, options = defaultCanvasOptions) {
    return canvas.getContext('2d', options);
}

export function getWebGLContext(canvas, options = defaultCanvasOptions) {
    return canvas.getContext('webgl2', options)
        || canvas.getContext('webgl', options)
        || canvas.getContext('experimental-webgl', options);
}

export function getWebGPUContext(canvas) {
    return canvas.getContext('gpu')
        || canvas.getContext('gpupresent');
}

export function resizeCanvas(canvas, scale = devicePixelRatio) {
    const scaledWidth = canvas.clientWidth * scale;
    const scaledHeight = canvas.clientHeight * scale;
    if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        return true;
    }

    return false;
}

export const defaultCanvasOptions = {
    alpha: false,
    depth: true,
    stencil: false,
    antialias: false,
    desynchronized: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
};

export const createCanvas = () => document.createElement('canvas');

export const getCanvasContext = (canvas, options = defaultCanvasOptions) => canvas.getContext('2d', options);

export const getWebGLContext = (canvas, options = defaultCanvasOptions) => canvas.getContext('webgl2', options) || canvas.getContext('webgl', options);

export const getWebGPUContext = (canvas) => canvas.getContext('gpupresent');

export const resizeCanvas = (canvas, scale = devicePixelRatio) => {
    const scaledWidth = canvas.clientWidth * scale;
    const scaledHeight = canvas.clientHeight * scale;
    if (canvas.width !== scaledWidth || canvas.height !== scaledHeight) {
        canvas.width = scaledWidth;
        canvas.height = scaledHeight;
        return true;
    }

    return false;
};

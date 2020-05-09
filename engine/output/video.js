export const canvasOptions = {
    alpha: false,
    depth: true,
    stencil: false,
    antialias: false,
    desynchronized: true,
    premultipliedAlpha: true,
    preserveDrawingBuffer: false
};

export const createCanvas = () => document.createElement('canvas');

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

export const getContext = (canvas) => canvas.getContext('2d', canvasOptions);

export const draw = (context, renderables) => {
    for (const renderable of renderables) {
        const { image, sx, sy, sw, sh, dx, dy, dw, dh } = renderable;
        context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
};
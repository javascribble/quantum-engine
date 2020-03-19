import { createCanvas, getWebGPUContext, setElementParent } from '../imports';

export const createWebGPUContext = (options) => {
    const canvas = createCanvas();
    setElementParent(canvas, options.parent);

    const context = getWebGPUContext(canvas);
    context.canvas = canvas;
    return context;
}

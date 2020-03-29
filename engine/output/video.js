import { setElementParent } from '../application/browser';
import { createCanvas, resizeCanvas } from './canvas';

export const defaultVideoOptions = {
    scale: devicePixelRatio,
    parent: document.body
};

export const createRenderingCanvas = (options = defaultVideoOptions) => {
    const canvas = createCanvas();
    setElementParent(canvas, options.parent);
    resizeCanvas(canvas, options.scale);
    return canvas;
}
import { createCanvas, defaultCanvasOptions } from '../canvas';

export function createCanvas2dContext(options = defaultCanvasOptions) {
    let canvas = createCanvas();
    let context = canvas.getContext('2d', options);
    return context;
}
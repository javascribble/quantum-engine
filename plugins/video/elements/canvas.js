import { Plugin, define } from '../imports.js';
import { createCanvas, resizeCanvas, getContext } from '../output/canvas.js';

export class Canvas extends Plugin {
    constructor() {
        super();

        const canvas = createCanvas();
        this.appendChild(canvas);
        resizeCanvas(canvas);

        this.context = getContext(canvas);
    }

    add(renderable) {
    }

    animate(deltaTime) {
        // for (const { image, sx, sy, sw, sh, dx, dy, dw, dh } of renderables) {
        //     this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        // }
    }

    delete(renderable) {
    }
}

define('canvas', Canvas);
import { Plugin, define } from '../imports.js';
import { createCanvas, resizeCanvas, getContext } from '../output/canvas.js';
import { loadImage } from '../network/loader.js';

export class Canvas extends Plugin {
    constructor() {
        super();

        this.loaders.png = loadImage;

        const canvas = createCanvas();
        this.appendChild(canvas);
        resizeCanvas(canvas);

        this.context = getContext(canvas);

        this.subscribe('animate', this.animate);
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
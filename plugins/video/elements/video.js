import { createCanvas, resizeCanvas, getContext } from '../output/canvas.js';
import { loadImage } from '../network/loader.js';

export class Video extends HTMLElement {
    constructor() {
        super();

        const canvas = createCanvas();
        this.appendChild(canvas);
        resizeCanvas(canvas);

        this.context = getContext(canvas);

        this.draws = new Set();

        const engine = this.parentElement;
        engine.loader.extensions.png = loadImage;
        engine.animations.add(this);
    }

    animate(deltaTime) {
        for (const draw of this.draws) {
            this.context.drawImage(draw.image, draw.sx, draw.sy, draw.sw, draw.sh, draw.dx, draw.dy, draw.dw, draw.dh);
        }
    }
}

customElements.define('video-plugin', Video);
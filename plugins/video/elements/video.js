import { createCanvas, resizeCanvas, getContext } from '../output/canvas.js';
import { loadImage } from '../network/loader.js';

export class Video extends HTMLElement {
    constructor() {
        super();

        const canvas = createCanvas();
        this.appendChild(canvas);
        resizeCanvas(canvas);

        this.context = getContext(canvas);

        this.entities = new Set();

        const engine = this.parentElement;
        engine.loaders.png = loadImage;
        engine.animations.add(this);
        engine.systems.add(this);
    }

    add(entity) {
        this.entities.add(entity);
    }

    delete(entity) {
        this.entities.delete(entity);
    }

    validate(entity) {
        return entity.renderable;
    }

    animate(deltaTime) {
        for (const { renderable } of this.entities) {
            // TODO: Support more primitives (animation, text, rectangle, circle, arc, line).
            const { image, sx, sy, sw, sh, dx, dy, dw, dh } = renderable;
            this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    }
}

customElements.define('video-plugin', Video);
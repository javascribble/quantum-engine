import { createCanvas, resizeCanvas, getContext } from '../output/canvas.js';

export class Video extends HTMLElement {
    constructor() {
        super();

        this.canvas = createCanvas();
        this.context = getContext(this.canvas);
        this.appendChild(this.canvas);

        this.entities = new Set();
        this.add = (entity) => this.entities.add(entity);
        this.delete = (entity) => this.entities.delete(entity);
        this.validate = (entity) => entity.renderable;

        const engine = this.parentElement;
        engine.animations.add(this);
        engine.systems.add(this);
    }

    animate(deltaTime) {
        resizeCanvas(this.canvas);
        for (const { renderable } of this.entities) {
            // TODO: Support more primitives (animation, text, rectangle, circle, arc, line).
            const { image, sx, sy, sw, sh, dx, dy, dw, dh } = renderable;
            this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    }
}

customElements.define('video-plugin', Video);
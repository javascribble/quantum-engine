import { Quantum, define, query } from '@javascribble/quantum';
import { resizeCanvas, getContext } from '../output/canvas.js';
import { canvas } from '../templates/canvas.js';

export class Canvas extends Quantum {
    constructor() {
        super(canvas);

        this.canvas = query(this.shadowRoot, 'canvas');
        this.context = getContext(this.canvas);

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

define(Canvas);
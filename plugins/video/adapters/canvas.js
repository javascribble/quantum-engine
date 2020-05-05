import { resizeCanvas, defaultCanvasOptions } from '../rendering/canvas.js';

export class Canvas extends HTMLElement {
    constructor() {
        super();

        const engine = this.parentElement;

        const canvas = document.createElement('canvas');
        this.appendChild(canvas);
        resizeCanvas(canvas);

        this.context = canvas.getContext('2d', defaultCanvasOptions);
    }

    connectedCallback() {
    }

    add(renderable) {
        // TODO: Implement custom and default placeholders.
    }

    update(deltaTime) {
        // for (const { image, sx, sy, sw, sh, dx, dy, dw, dh } of renderables) {
        //     this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        // }
    }

    delete(renderable) {
    }

    disconnectedCallback() {
    }
}

customElements.define('w-canvas', Canvas);
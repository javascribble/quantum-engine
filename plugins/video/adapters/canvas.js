import { resizeCanvas, defaultCanvasOptions } from '../rendering/canvas.js';

export class Canvas extends HTMLElement {
    constructor() {
        super();

        const canvas = document.createElement('canvas');
        this.appendChild(canvas);
        resizeCanvas(canvas);

        this.context = canvas.getContext('2d', defaultCanvasOptions);
    }

    connectedCallback() {
    }

    add(renderable) {
        // TODO: Implement custom and default placeholders.
        // loadResource(renderable.image).then(image => {
        //     renderable.image = image;
        //     renderables.add(renderable);
        // });
    }

    update(deltaTime) {
        console.log(deltaTime);
        // for (const { image, sx, sy, sw, sh, dx, dy, dw, dh } of renderables) {
        //     this.context.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        // }
    }

    delete(renderable) {
        // renderables.delete(renderable);
    }

    disconnectedCallback() {
    }
}

customElements.define('w-canvas', Canvas);
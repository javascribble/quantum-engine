import { loadImage } from '../network/loader.js';

export class Scene extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const engine = this.parentElement;
        engine.loaders.png = loadImage;

        engine.load("/test/resources/Kal16.png").then(image => {
            const entity = engine.createEntity();
            entity.renderable = {
                image,
                sx: 0,
                sy: 0,
                sw: 16,
                sh: 16,
                dx: 100,
                dy: 100,
                dw: 16,
                dh: 16
            };
        });

        engine.start();
    }
}

customElements.define('scene-plugin', Scene);
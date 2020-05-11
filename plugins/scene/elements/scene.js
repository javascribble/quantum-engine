export class Scene extends HTMLElement {
    constructor() {
        super();

        const engine = this.parentElement;
        engine.load('/test/engine.json').then(options => {
            const scene = options.scenes[0];
            const node = scene.nodes[0];
            engine.load(node.renderable.image).then(image => {
                node.renderable.image = image;
                const entity = engine.createEntity();
                entity.renderable = node.renderable;
            })
        });
    }
}

customElements.define('scene-plugin', Scene);
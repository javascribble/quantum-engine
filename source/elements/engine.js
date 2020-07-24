import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    constructor() {
        super();

        //engine.loaders.png = loadImage;
        //engine.start();

        // this.entities = new Set();
        // this.add = (entity) => this.entities.add(entity);
        // this.delete = (entity) => this.entities.delete(entity);
        // this.validate = (entity) => entity.renderable;

        // const engine = this.parentElement;
        // engine.animations.add(this);
        // engine.systems.add(this);
    }

    static template = quantum.template(html);
}

quantum.define('quantum-engine', Engine);
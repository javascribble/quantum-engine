import { Component, template, observeSlot } from '../../references/quantum.js';
import html from '../templates/engine.js';

export class Engine extends Component {
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

    static template = template(html);

    static attributes = [];
}

customElements.define('quantum-engine', Engine);
import { Quantum, define, observeSlot } from '../../references/quantum.js';
import { engine } from '../templates/engine.js';

export class Engine extends Quantum {
    constructor() {
        super(engine);
    }

    initializeShadowCallback(shadow) {
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
}

define(Engine);
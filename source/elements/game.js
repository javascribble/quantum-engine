import { Component, define, animate } from '../import.js';
import { createEntityInterface } from '../architecture/entity.js';
import { createInputSystem } from '../systems/input.js';
import { createSpriteSystem } from '../systems/sprite.js';
import { createSceneSystem } from '../systems/scene.js';

export class Game extends Component {
    systems = new Set();

    constructor() {
        super();

        const { createEntity, deleteEntity } = createEntityInterface(this.systems);
        this.systems.add(createInputSystem(createEntity, deleteEntity));
        this.systems.add(createSpriteSystem(createEntity, deleteEntity));
        this.systems.add(createSceneSystem(createEntity, deleteEntity));
    }

    connectedCallback() {
        animate((delta, elapsed) => {
            this.systems.forEach(system => system.update?.(delta, elapsed));
            return this.isConnected;
        });
    }

    async load(api, options) {
        this.systems.forEach(async system => await system.load?.(api, options));
    }

    adapt(api) {
        api.load = this.load.bind(this);
    }
}

define('quantum-game', Game);
import { initializeAPI } from '../architecture/api.js';
import { initializeECS } from '../architecture/ecs.js';
import html from '../templates/engine.js';

const { animate, loadJson } = quantum;

export class Engine extends Quantum {
    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        loadJson(currentValue).then(this.run.bind(this));
    }

    async run(options) {
        const ecs = initializeECS();
        const api = initializeAPI(options);
        for (const element of this.slots.get('')) {
            await element.adapt?.(api);
        }

        quantum.plugins(this, { ...api, ...ecs }, options);

        return animate(time => {
            ecs.updateSystems(time);
            return this.isConnected;
        });
    }
}

Engine.define('quantum-engine', html);
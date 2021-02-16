import { initializeAPI } from '../architecture/api.js';
import html from '../templates/engine.js';

const { animate, loadJson } = quantum;

export class Engine extends Quantum {
    plugins = new Set();

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        loadJson(currentValue).then(this.run.bind(this));
    }

    async run(options) {
        const api = initializeAPI(options);
        for (const element of this.slots.get('')) {
            await element.adapt?.(api);
        }

        for (const plugin of this.plugins) {
            await plugin(api, this);
        }

        await api.loadEntity(options.prototypeRoot);
        return animate(time => {
            api.updateSystems(time);
            return this.isConnected;
        });
    }
}

Engine.define('quantum-engine', html);
import { animation } from '../plugins/animation.js';
import { architecture } from '../plugins/architecture.js';
import engine from '../templates/engine.js';

const { loadJson } = quantum;

export class Engine extends Quantum {
    plugins = [];

    static get observedAttributes() { return ['src']; }

    static plugins = new Set([animation, architecture]);

    attributeChangedCallback(attribute, previousValue, currentValue) {
        loadJson(currentValue).then(this.load.bind(this));
    }

    slotChangedCallback(slot, addedElements, deletedElements, currentElements) {
        for (const addedElement of addedElements) this[addedElement.id] = addedElement;
        for (const deletedElement of deletedElements) delete this[deletedElement.id];
    }

    async load(options) {
        this.unload();

        this.options = options;

        for (const plugin of Engine.plugins) await plugin.load(this);
        for (const plugin of this.plugins) await plugin.load(this);
    }

    unload() {
        delete this.options;

        for (const plugin of Engine.plugins) plugin.unload(this);
        for (const plugin of this.plugins) plugin.unload(this);
    }
}

Engine.define('quantum-engine', engine);
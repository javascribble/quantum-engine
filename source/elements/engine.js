import { adapters, plugins } from '../architecture/api.js';
import { getAdapter } from '../utilities/adapter.js';
import engine from '../templates/engine.js';

const { load } = quantum;

export class Engine extends Quantum {
    adapters = { ...adapters };
    plugins = { ...plugins };

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        if (currentValue) {
            load(currentValue).then(data => this.load(data));
        } else {
            this.unload();
        }
    }

    slotChangedCallback(slot, addedElements, deletedElements, currentElements) {
        for (const addedElement of addedElements) {
            this.adapters[getAdapter(addedElement)].load(addedElement);
        }

        for (const deletedElement of deletedElements) {
            this.adapters[getAdapter(deletedElement)].unload(deletedElement);
        }
    }

    async load(data) {
        for (const plugin of Object.values(this.plugins)) {
            await plugin.load(this.adapters, this.plugins, data);
        }
    }

    async unload() {
        for (const plugin of Object.values(this.plugins)) {
            await plugin.unload(this.adapters, this.plugins);
        }
    }
}

Engine.define('quantum-engine', engine);
import { getAdapter } from '../decorators/element.js';
import engine from '../templates/engine.js';

const { load, extensions } = quantum;

export class Engine extends Quantum {
    extensions = new Map();

    constructor(options) {
        super(options);

        for (const [name, extension] of extensions) {
            this.extensions.set(name, new extension(this));
        }
    }

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        if (currentValue) {
            load(currentValue).then(data => this.load(data));
        } else {
            this.unload();
        }
    }

    slotChangedCallback(slot, addedElements, deletedElements, currentElements) {
        for (const addedElement of addedElements) this.extensions.get(getAdapter(addedElement))?.add(addedElement);
        for (const deletedElement of deletedElements) this.extensions.get(getAdapter(deletedElement))?.delete(deletedElement);
    }

    async load(data, bridge = {}) {
        for (const [name, extension] of this.extensions) bridge[name] = await extension.load(bridge, data[name] || {});
    }

    unload() {
        for (const extension of this.extensions.values()) extension?.unload();
    }
}

Engine.define('quantum-engine', engine);
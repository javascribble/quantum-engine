import html from '../templates/engine.js';

const { loadJson } = quantum;

export class Engine extends Quantum {
    plugins = [];

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        loadJson(currentValue).then(this.load.bind(this));
    }

    slotChangedCallback(slot, addedElements, deletedElements, currentElements) {
        for (const addedElement of addedElements) this[addedElement.id] = addedElement;
        for (const deletedElement of deletedElements) delete this[deletedElement.id];
    }

    async load(options) {
        this.options = options;

        for (const plugin of this.plugins) await plugin(this);
    }
}

Engine.define('quantum-engine', html);
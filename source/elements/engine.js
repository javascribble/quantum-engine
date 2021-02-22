import { initializeAnimation } from '../extensions/animation.js';
import { initializePrototypes } from '../extensions/prototypes.js';

import html from '../templates/engine.js';

const { animate, loadJson } = quantum;

export class Engine extends Quantum {
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
        this.#animation?.cancel();

        for (const plugin of this.plugins) await plugin(this);

        this.#animation = animate(time => {

            return this.isConnected;
        });
    }
}

Engine.define('quantum-engine', html);
import { initializeAPI } from '../architecture/api.js';
import { initializeECS } from '../architecture/ecs.js';
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

    slotChangedCallback(slot, addedElements, deletedElements, currentElements) {
        addedElements.forEach(addedElement => this[addedElement.id] = addedElement);
        deletedElements.forEach(deletedElement => delete this[deletedElement.id]);
    }

    async run(options) {
        initializeECS(this);
        initializeAPI(this, options);
        for (const plugin of this.plugins) {
            await plugin(this);
        }

        await this.loadEntity(options.prototypeRoot);
        return animate(time => {
            this.updateSystems(time);
            return this.isConnected;
        });
    }
}

Engine.define('quantum-engine', html);
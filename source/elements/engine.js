import { createEntities } from '../architecture/entity.js';
import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    #broker = new quantum.EventBroker();

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = quantum.template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        quantum.load(currentValue).then(options => this.load(options));
    }

    load(options) {
        const api = { options, broker: this.#broker, ...createEntities() };
        for (const [slot, elements] of this.slots) {
            for (const element of elements) {
                element.integrate?.(api);
            }
        }

        this.onload?.();
    }
}

quantum.define('quantum-engine', Engine);
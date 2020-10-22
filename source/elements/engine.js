import { createEntityInterface } from '../architecture/entity.js';
import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = quantum.template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        fetch(currentValue).then(options => options.json()).then(this.load.bind(this));
    }

    async load(options) {
        const api = { options, broker: new quantum.EventBroker(), ...createEntityInterface() };
        for (const [slot, elements] of this.slots) {
            for (const element of elements) {
                await element.integrate?.(api);
            }
        }

        await this.integrate?.(api);
    }
}

quantum.define('quantum-engine', Engine);
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
        fetch(currentValue).then(options => options.json()).then(this.integrate.bind(this));
    }

    async integrate(options) {
        const api = { options, broker: this.#broker };
        for (const [slot, elements] of this.slots) {
            for (const element of elements) {
                await element.integrate?.(api);
            }
        }
    }
}

quantum.define('quantum-engine', Engine);
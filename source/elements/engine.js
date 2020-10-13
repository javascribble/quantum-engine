import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    broker = new quantum.EventBroker();

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = quantum.template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        fetch(currentValue).then(options => options.json()).then(this.load);
    }

    async load(options) {
        const api = { options, broker };
        const elements = this.slots.values();
        elements.forEach(element => element.integrate?.(api));
        elements.forEach(element => await element.load?.(api));
    }
}

quantum.define('quantum-engine', Engine);
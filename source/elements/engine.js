import { initializeAPI } from '../architecture/api.js';
import html from '../templates/engine.js';

const { Component, template, define, animate, loadJson } = quantum;

export class Engine extends Component {
    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        loadJson(currentValue).then(this.run.bind(this));
    }

    async run(options) {
        const api = initializeAPI(options);
        for (const element of this.slots.get('')) {
            await element.adapt?.(api);
        }

        return animate(await this.initialize(api, options));
    }

    async initialize(api, options) {
        return (await import(options.module)).default(this, api, options);
    }
}

define('quantum-engine', Engine);
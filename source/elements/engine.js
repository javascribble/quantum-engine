import { Component, template, define, animate } from '../import.js';
import { initializeAPI } from '../architecture/api.js';
import html from '../templates/engine.js';

export class Engine extends Component {
    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        fetch(currentValue).then(response => response.json()).then(this.run.bind(this));
    }

    async run(options) {
        const api = initializeAPI();
        for (const element of this.elements.get(this.slots.get(''))) {
            element.adapt?.(api, options);
        }

        const module = await import(options.module);
        const execute = await module.default(api, options);
        return animate(time => this.isConnected && execute(time));
    }
}

define('quantum-engine', Engine);
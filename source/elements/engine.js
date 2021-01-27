import { initialize } from '../architecture/ecs.js';
import html from '../templates/engine.js';

const { Component, template, define, animate } = quantum;

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

    async run(options, animation) {
        const api = initialize();
        for (const element of this.slots.get('')) {
            await element.adapt?.(api);
        }

        return animate(animation || await (await import(options.module)).default(this, api, options));
    }
}

define('quantum-engine', Engine);
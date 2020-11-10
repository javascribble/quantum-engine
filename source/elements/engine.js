import { Component, template, define, animate } from '../import.js';
import { initializeECS } from '../architecture/ecs.js';
import html from '../templates/engine.js';

export class Engine extends Component {
    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        fetch(currentValue).then(response => response.json()).then(this.load.bind(this));
    }

    async load(options) {
        const api = {};
        for (const plugin of Array.from(this.slots.values()).flat()) {
            await plugin.adapt(api, options);
        }

        const { systems } = await import(options.entryPoint);
        const ecs = initializeECS(systems);
        return animate(time => {
            //ecs.update(time);
            return this.isConnected;
        });
    }
}

define('quantum-engine', Engine);
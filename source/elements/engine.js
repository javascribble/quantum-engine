import { initializeAPI } from '../architecture/api.js';
import html from '../templates/engine.js';

export class Engine extends Loader {
    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        this.loaders.json(currentValue).then(this.run.bind(this));
    }

    async run(options) {
        initializeAPI(this, options);
        for (const element of this.slots.get('')) {
            element.adapt?.(this, options);
        }

        return animate(await (await import(options.module)).default(this, options));
    }
}

define('quantum-engine', Engine);
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
        fetch(currentValue).then(response => response.json()).then(this.run.bind(this));
    }

    async run(options) {
        const api = initializeAPI(this, options);
        for (const element of this.slots.get('')) {
            element.adapt?.(api, options);
        }

        (await import(options.module)).default(api);
        await api.loadEntities(options.entities);
        return animate(time => {
            api.updateSystems(time);
            return this.isConnected;
        });
    }
}

define('quantum-engine', Engine);
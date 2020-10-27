import { createEntityInterface } from '../architecture/entity.js';
import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    #animation;

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = quantum.template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        fetch(currentValue).then(options => options.json()).then(this.load.bind(this));
    }

    async load(options, plugins) {
        this.#animation?.cancel();

        const api = { options, broker: new quantum.EventBroker(), ...createEntityInterface() };
        for (const plugin of plugins || Array.from(this.slots.values()).flat()) {
            await plugin.integrate?.(api);
        }

        await this.integrate?.(api);

        this.#animation = quantum.animate((delta, elapsed) => {
            api.systems.forEach(system => system.update?.(delta, elapsed));
            return this.isConnected;
        });
    }
}

quantum.define('quantum-engine', Engine);
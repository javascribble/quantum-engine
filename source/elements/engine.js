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

    async load(options, plugins = Array.from(this.slots.values()).flat()) {
        this.#animation?.cancel();

        const api = { options, broker: new quantum.EventBroker(), ...createEntityInterface() };
        for (const plugin of plugins) {
            await plugin.integrate?.(api);
        }

        await this.integrate?.(api);

        const systems = Array.from(api.systems.values());
        const updaters = systems.filter(system => system.update !== undefined);
        const renderers = systems.filter(system => system.render !== undefined);
        this.#animation = quantum.animate((delta, elapsed) => {
            updaters.forEach(updater => updater.update(delta, elapsed));
            renderers.forEach(renderer => renderer.render(delta, elapsed));
            return this.isConnected;
        });
    }
}

quantum.define('quantum-engine', Engine);
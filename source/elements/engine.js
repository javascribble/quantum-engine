import { createAdapters, createPlugins } from '../architecture/api.js';
import { getAdapter } from '../utilities/adapter.js';
import { getBridge } from '../utilities/bridge.js';
import engine from '../templates/engine.js';

const { load } = quantum;

export class Engine extends Quantum {
    adapters = createAdapters();
    plugins = createPlugins();

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        if (currentValue) {
            load(currentValue).then(data => this.load(data));
        } else {
            this.unload();
        }
    }

    slotChangedCallback(slot, addedElements, deletedElements, currentElements) {
        for (const addedElement of addedElements) this.adapters.get(getAdapter(addedElement)).add(addedElement);
        for (const deletedElement of deletedElements) this.adapters.get(getAdapter(deletedElement)).delete(deletedElement);
    }

    async load(data) {
        const { adapters, plugins } = data;
        const bridge = getBridge(this.adapters, this.plugins);
        for (const [name, adapter] of this.adapters) await adapter.load(adapters[name]);
        for (const [name, plugin] of this.plugins) await plugin.load(bridge, plugins[name]);
    }

    unload() {
        for (const [name, adapter] of this.adapters) adapter.unload();
        for (const [name, plugin] of this.plugins) plugin.unload();
    }
}

Engine.define('quantum-engine', engine);
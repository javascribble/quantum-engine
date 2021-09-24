import { createAdapters, createPlugins, createBridge } from '../architecture/api.js';
import { getAdapter } from '../decorators/element.js';
import { appendAll } from '../utilities/template.js';
import { importAll } from '../utilities/window.js';
import engine from '../templates/engine.js';

const { load } = quantum;

export class Engine extends Quantum {
    #templates = new Set();

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

    async load({ imports, templates, adapters, plugins }) {
        await importAll(imports);
        await appendAll(this, this.#templates, templates);
        const bridge = createBridge(this.adapters, this.plugins);
        for (const [name, adapter] of this.adapters) await adapter.load(adapters[name]);
        for (const [name, plugin] of this.plugins) await plugin.load(bridge, plugins[name]);
    }

    unload() {
        for (const plugin of this.plugins.values()) plugin.unload();
        for (const adapter of this.adapters.values()) adapter.unload();
        for (const template of this.#templates) this.removeChild(template);
        this.#templates.clear();
    }
}

Engine.define('quantum-engine', engine);
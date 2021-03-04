const { loadJson } = quantum;

export class Engine extends Quantum {
    plugins = [];

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static get observedAttributes() { return ['src']; }

    static plugins = new Set();

    attributeChangedCallback(attribute, previousValue, currentValue) {
        loadJson(currentValue).then(this.run.bind(this));
    }

    slotChangedCallback(slot, addedElements, deletedElements, currentElements) {
        for (const addedElement of addedElements) this[addedElement.id] = addedElement;
        for (const deletedElement of deletedElements) delete this[deletedElement.id];
    }

    connectedCallback() {
        for (const plugin of Engine.plugins) plugin.connect?.(this);
        for (const plugin of this.plugins) plugin.connect?.(this);
    }

    disconnectedCallback() {
        for (const plugin of Engine.plugins) plugin.disconnect?.(this);
        for (const plugin of this.plugins) plugin.disconnect?.(this);
    }

    async run(options) {
        this.options = options;
        for (const plugin of Engine.plugins) await plugin.run?.(this);
        for (const plugin of this.plugins) await plugin.run?.(this);
    }
}
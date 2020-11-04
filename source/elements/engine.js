import { Component, template, define } from '../import.js';
import { integratePlugin, disintegratePlugin } from '../utilities/plugin.js';
import html from '../templates/engine.js';

export class Engine extends Component {
    #interface = { broker: new quantum.EventBroker() };

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = template(html);

    static get observedAttributes() { return ['src']; }

    slotChangedCallback(slot, addedElements, deletedElements) {
        deletedElements.forEach(element => disintegratePlugin(this.#interface, element));
        addedElements.forEach(element => integratePlugin(this.#interface, element));
    }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        fetch(currentValue).then(response => response.json()).then(this.load?.bind(this.#interface));
    }

    connectedCallback() {
        quantum.animate((delta, elapsed) => {
            this.update?.call(this.#interface, delta, elapsed);
            return this.isConnected;
        });
    }
}

define('quantum-engine', Engine);
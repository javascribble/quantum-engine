import { EventBroker, Component, template, define, animate } from '../import.js';
import html from '../templates/engine.js';

export class Engine extends Component {
    #interface = { broker: new EventBroker() };

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = template(html);

    static get observedAttributes() { return ['src']; }

    slotChangedCallback(slot, addedElements, deletedElements) {
        addedElements.forEach(element => element.adapt(this.#interface));
    }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        fetch(currentValue).then(response => response.json()).then(this.load?.bind(this.#interface));
    }

    connectedCallback() {
        animate((delta, elapsed) => {
            this.update?.call(this.#interface, delta, elapsed);
            return this.isConnected;
        });
    }
}

define('quantum-engine', Engine);
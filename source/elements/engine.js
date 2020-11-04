import { EventBroker, Component, template, define } from '../import.js';
import html from '../templates/engine.js';

export class Engine extends Component {
    api = { broker: new EventBroker() };

    constructor() {
        super();

        this.setAttribute('tabindex', 0);
    }

    static template = template(html);

    static get observedAttributes() { return ['src']; }

    slotChangedCallback(slot, addedElements, deletedElements) {
        addedElements.forEach(element => element.adapt(this.api));
    }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        fetch(currentValue).then(response => response.json()).then(options => this.load(options));
    }

    load(options) {
        this.api.load(this.api, options);
    }
}

define('quantum-engine', Engine);
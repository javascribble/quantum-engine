import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    #broker = new quantum.EventBroker();

    static template = quantum.template(html);

    static get observedAttributes() { return ['src']; }

    attributeChangedCallback(attribute, previousValue, currentValue) {
        quantum.load(currentValue).then(configuration => this.load(configuration));
    }

    load(configuration) {
        for (const [slot, elements] of this.slottedElements) {
            for (const element of elements) {
                element.integrate?.(this.#broker);
                element.configure?.(configuration);
            }
        }

        this.#broker.publish('reset');
        this.onload?.();
    }
}

quantum.define('quantum-engine', Engine);
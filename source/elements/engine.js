import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    static template = quantum.template(html);

    slotChangedCallback(slot, addedElements, deletedElements) {
        for (const element of addedElements) {
            this[element.id] = element;
        }

        for (const element of deletedElements) {
            delete this[element.id];
        }

        this.onload?.();
    }
}

quantum.define('quantum-engine', Engine);
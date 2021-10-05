import { getAdapter } from '../decorators/element.js';
import engine from '../templates/engine.js';

export class Engine extends Quantum.Extensible {
    constructor(options) {
        super(options, 'engine-preset');
    }

    slotChangedCallback(slot, addedElements, deletedElements, currentElements) {
        for (const addedElement of addedElements) this.extensions.get(getAdapter(addedElement))?.add(addedElement);
        for (const deletedElement of deletedElements) this.extensions.get(getAdapter(deletedElement))?.delete(deletedElement);
    }
}

Engine.define('quantum-engine', engine);
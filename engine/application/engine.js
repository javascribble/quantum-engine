import Component from '../extensions/component.js';
import { define, createSlot } from '../utilities/elements.js';
import { start, stop } from './session.js';
import { animations } from './animation.js';
import { systems } from './architecture.js';
import { plugins } from './plugins.js';

export class Engine extends Component {
    constructor() {
        super();

        const slot = createSlot();
        this.shadow().appendChild(slot);
        for (const element of slot.assignedElements()) {
            if (element.start && element.stop) {
                plugins.add(element);
            }

            if (element.system && element.add && element.delete) {
                systems.set(element.system, element);
            }

            if (element.update) {
                animations.add(element);
            }
        }
    }

    static get observedAttributes() {
        return ['src'];
    }

    set src(value) {
        // TODO: load
    }

    connectedCallback() {
        start();
    }

    disconnectedCallback() {
        stop();
    }
}

define('engine', Engine);
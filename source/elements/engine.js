import { interfaces } from '../constants/interface.js';
import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    static template = quantum.template(html);

    slotChangedCallback(slot, addedElements, deletedElements) {
        for (const element of addedElements) {
            for (const token of interfaces) {
                const member = element[token];
                if (member) {
                    this[token] = member.bind(element);
                }
            }
        }

        for (const element of deletedElements) {
            for (const token of interfaces) {
                if (this[token] == element[token]) {
                    this[token] = null; // TODO: Make this not wrong.
                }
            }
        }

        this.onload?.();
    }
}

quantum.define('quantum-engine', Engine);
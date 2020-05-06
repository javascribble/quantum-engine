import { clone } from '../utilities/elements.js';

export class Component extends HTMLElement {
    constructor(template) {
        super();

        this.appendChild(clone(template));
    }

    attributeChangedCallback(name, previous, current) {
        this[name] = current;
    }
}

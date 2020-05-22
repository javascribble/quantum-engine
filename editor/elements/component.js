import { clone, shadow } from '../../shared/utilities/elements.js';

export class Component extends HTMLElement {
    constructor(template) {
        super();

        shadow(this).appendChild(clone(template));
    }
}
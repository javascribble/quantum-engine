import { defaultShadowOptions } from './shadow';

const defaultContainerElement = 'div';

export default class Element extends HTMLElement {
    constructor(template) {
        super();

        const container = document.createElement(defaultContainerElement);
        container.innerHTML = template();

        const shadow = this.attachShadow(defaultShadowOptions);
        shadow.appendChild(container);
    }
}

export const define = (name, type) => customElements.define(name, type);
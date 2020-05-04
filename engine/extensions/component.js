export class Component extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return [];
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }

    attributeChangedCallback(name, previous, current) {
        this[name] = current;
    }
}

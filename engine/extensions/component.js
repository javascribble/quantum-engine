export class Component extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() { return [] }

    attributeChangedCallback(name, previous, current) {
    }
}

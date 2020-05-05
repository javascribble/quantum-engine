export class Component extends HTMLElement {
    constructor() {
        super();
    }

    attributeChangedCallback(name, previous, current) {
        this[name] = current;
    }
}

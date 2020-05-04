export default class Component extends HTMLElement {
    constructor() {
        super();
    }

    attributeChangedCallback(name, previous, current) {
        this[name] = current;
    }

    shadow() {
        return this.attachShadow({ mode: 'closed' });
    }
}

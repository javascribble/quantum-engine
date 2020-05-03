export default class Component extends HTMLElement {
    constructor(template) {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
        shadow.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['disabled'];
    }

    get enabled() {
        return !this.hasAttribute('disabled');
    }

    connectedCallback() {
        //Added to DOM.
    }

    disconnectedCallback() {
        //Removed from DOM.
    }

    attributeChangedCallback(name, previousValue, currentValue) {
        //Called when an observed attribute (observableAttributes) is added/removed/updated/replaced.
    }

    adoptedCallback() {
        //Moved into a new document via adoptNode().
    }
}

export default class Editor extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
    }

    connectedCallback() {
        //Added to DOM.
    }

    disconnectedCallback() {
        //Removed from DOM.
    }

    attributeChangedCallback(name, previous, current) {
        //Called when an observed attribute (observableAttributes) is added/removed/updated/replaced.
    }

    adoptedCallback() {
        //Moved into a new document via adoptNode().
    }
}

customElements.define('w-editor', Editor);
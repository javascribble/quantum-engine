import { Component, define } from '../../engine/main.js';

export class Editor extends Component {
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

define('editor', Editor);
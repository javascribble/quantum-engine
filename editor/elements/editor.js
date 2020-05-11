import { editor } from '../templates/editor.js';
import { shadow, clone } from '../utilities/elements.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        shadow(this).appendChild(clone(editor(['TODO: collect plugins'])));
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }
}

customElements.define('game-editor', Editor); 
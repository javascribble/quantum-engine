import { shadow, define, clone } from '../imports.js';
import { editor } from '../templates/editor.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        shadow(this).appendChild(clone(editor));
    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }
}

define('editor', Editor); 
import { editor } from '../templates/editor.js';
import { shadow, clone } from '../utilities/elements.js';
import { syncLayout } from '../application/layout.js';
import { syncState } from '../application/state.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        const template = clone(editor);
        syncLayout(template);
        syncState(template);

        const root = shadow(this);
        root.appendChild(template);
    }
}

customElements.define('game-editor', Editor);
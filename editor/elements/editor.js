import { editor } from '../templates/editor.js';
import { objects } from '../templates/objects.js';
import { shadow, clone } from '../utilities/elements.js';
import { syncStyles } from '../storage/local.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        const root = shadow(this);
        root.appendChild(clone(editor));

        syncStyles(root, '#properties', ['width'], ['300px']);
        syncStyles(root, '#objects', ['width'], ['300px']);
        syncStyles(root, '#viewport', ['width', 'height'], ['300px', '300px']);

        root.querySelector('#objects').appendChild(clone(objects));
    }
}

customElements.define('game-editor', Editor);
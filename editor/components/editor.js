import { define } from '../../shared/utilities/elements.js';
import { editorTemplate } from '../templates/editor.js';
import { observeStyle } from '../application/layout.js';
import { Component } from '../elements/component.js';

export class Editor extends Component {
    constructor() {
        super(editorTemplate);

        const root = this.shadowRoot;
        observeStyle(root, '#objects', ['width'], ['300px']);
        observeStyle(root, '#properties', ['width'], ['300px']);
        observeStyle(root, '#viewport', ['width', 'height'], ['300px', '300px']);
    }
}

define('game-editor', Editor);
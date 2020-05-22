import { define } from '../../shared/utilities/elements.js';
import { layoutTemplate } from '../templates/layout.js';
import { observeStyle } from '../application/layout.js';
import { Component } from '../elements/component.js';

export class Layout extends Component {
    constructor() {
        super(layoutTemplate);

        const root = this.shadowRoot;
        observeStyle(root, '#objects', ['width'], ['300px']);
        observeStyle(root, '#properties', ['width'], ['300px']);
        observeStyle(root, '#viewport', ['width', 'height'], ['300px', '300px']);
    }
}

define('editor-layout', Layout);
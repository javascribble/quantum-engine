import { define, shadow, clone } from '../../shared/utilities/elements.js';
import { editorTemplate } from '../templates/editor.js';
import { observeStyle } from '../application/layout.js';
import { Layout } from '../components/layout.js';
import { Object } from '../components/object.js';
import { Objects } from '../components/objects.js';
import { Properties } from '../components/properties.js';
import { Property } from '../components/property.js';
import { Viewport } from '../components/viewport.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        const template = clone(editorTemplate);
        observeStyle(template, '#objects', ['width'], ['300px']);
        observeStyle(template, '#properties', ['width'], ['300px']);
        observeStyle(template, '#viewport', ['width', 'height'], ['300px', '300px']);

        const root = shadow(this);
        root.appendChild(template);
    }
}

define('game-editor', Editor);
define('editor-layout', Layout);
define('game-object', Object);
define('game-objects', Objects);
define('game-properties', Properties);
define('game-property', Property);
define('engine-viewport', Viewport);
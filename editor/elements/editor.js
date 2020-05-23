import { define, shadow, clone } from '../../shared/utilities/elements.js';
import { configureLayout } from '../application/layout.js';
import { configureProject } from '../application/project.js';
import { configureServices } from '../application/services.js';
import { editorTemplate } from '../templates/editor.js';
import { Layout } from '../components/layout.js';
import { Object } from '../components/object.js';
import { Objects } from '../components/objects.js';
import { Properties } from '../components/properties.js';
import { Property } from '../components/property.js';
import { Viewport } from '../components/viewport.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        const root = shadow(this);
        root.appendChild(clone(editorTemplate));

        configureLayout(root);
        configureProject(root);
        configureServices(root);
    }
}

define('game-editor', Editor);
define('editor-layout', Layout);
define('game-object', Object);
define('game-objects', Objects);
define('game-properties', Properties);
define('game-property', Property);
define('game-viewport', Viewport);
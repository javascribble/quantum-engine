import { clone, shadow } from '../../shared/utilities/elements.js';
import { configureProject } from '../application/project.js';
import { configureLayout } from '../application/layout.js';
import { enableServices } from '../application/services.js';
import { editor } from '../templates/editor.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        const template = clone(editor);
        configureLayout(template);
        configureProject(template);

        const root = shadow(this);
        root.appendChild(template);

        enableServices(root);
    }
}

customElements.define('game-editor', Editor);
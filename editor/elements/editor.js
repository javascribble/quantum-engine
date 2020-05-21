import { clone, shadow } from '../../shared/utilities/elements.js';
import { enableServices } from '../application/services.js';
import { syncProject } from '../application/project.js';
import { syncLayout } from '../application/layout.js';
import { editor } from '../templates/editor.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        const template = clone(editor);
        syncLayout(template);
        syncProject(template);

        const root = shadow(this);
        root.appendChild(template);

        enableServices(root);
    }
}

customElements.define('game-editor', Editor);
import { editor } from '../templates/editor.js';
import { shadow, clone } from '../utilities/elements.js';

export class Editor extends HTMLElement {
    constructor() {
        super();

        const template = clone(editor);

        this.properties = template.querySelector('.properties');
        this.objects = template.querySelector('.objects');

        this.properties.style.width = localStorage.getItem('propertiesWidth') || '300px';
        this.objects.style.width = localStorage.getItem('objectsWidth') || '300px';

        // localStorage.setItem('propertiesWidth', this.properties.style.width);
        // localStorage.setItem('objectsWidth', this.objects.style.width);

        shadow(this).appendChild(template);
    }
}

customElements.define('game-editor', Editor);
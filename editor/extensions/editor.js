import { Engine, define } from '../../engine/main.js';

export class Editor extends Engine {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return [...super.observedAttributes];
    }
}

define('editor', Editor);
import { Engine, define, load } from '../../engine/main.js';

export class Editor extends Engine {
    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
    }

    configure(options) {
        load(options.project).then(super.configure);
    }
}

define('editor', Editor); 
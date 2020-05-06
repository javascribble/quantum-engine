import { register } from '../application/plugins.js';
import { start, stop } from '../application/services.js';
import { define } from '../utilities/elements.js';
import { load } from '../network/loader.js';

export class Engine extends HTMLElement {
    constructor() {
        super();

        shadow(this);

        load(this.getAttribute('src')).then(this.configure)
    }

    connectedCallback() {
        start();
    }

    disconnectedCallback() {
        stop();
    }

    configure(options) {

    }
}

define('engine', Engine);
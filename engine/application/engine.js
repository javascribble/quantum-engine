import { register, configure } from './plugins.js';
import { start, stop } from './services.js';
import { define } from '../utilities/elements.js';
import { load } from '../network/loader.js';

export class Engine extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        start();
    }

    disconnectedCallback() {
        stop();
    }

    load(options) {
        load(this.getAttribute('src')).then(configure);
    }
}

define('engine', Engine);
import { define, shadow } from '../utilities/elements.js';
import { start, stop } from '../application/services.js';
import { plugins } from '../application/plugins.js';
import { load } from '../network/loader.js';

export class Engine extends HTMLElement {
    constructor() {
        super();

        const canvas = createCanvas();
        resizeCanvas(canvas);

        shadow(this).appendChild(canvas);

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
import { define } from '../utilities/elements.js';
import { start, stop } from '../application/services.js';

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
}

define('engine', Engine);
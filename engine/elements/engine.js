import { expose } from '../application/bridge.js';

export class Engine extends HTMLElement {
    constructor() {
        super();

        expose(this);
    }

    connectedCallback() {
        start();
    }

    disconnectedCallback() {
        stop();
    }
}

customElements.define('game-engine', Engine);
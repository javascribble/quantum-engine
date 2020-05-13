import { expose } from '../application/bridge.js';

export class Engine extends HTMLElement {
    constructor() {
        super();

        expose(this);
    }
}

customElements.define('game-engine', Engine);
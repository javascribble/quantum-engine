import { clone, shadow } from '../../shared/utilities/elements.js';
import { expose } from '../application/bridge.js';
import { engine } from '../templates/engine.js';

export class Engine extends HTMLElement {
    constructor() {
        super();

        expose(this);

        const root = shadow(this);
        root.appendChild(clone(engine));
    }
}

customElements.define('game-engine', Engine);
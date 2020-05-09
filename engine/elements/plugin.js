import { expose } from '../application/bridge.js';

export class Plugin extends HTMLElement {
    constructor() {
        super();

        expose(this);
    }
}
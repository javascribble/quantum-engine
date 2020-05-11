import * as browser from '../application/browser.js';
import * as device from '../application/device.js';
import * as events from '../application/events.js';
import * as services from '../application/services.js';
import * as loader from '../network/loader.js';
import { createEntity, deleteEntity } from '../architecture/entities.js';

export class Engine extends HTMLElement {
    constructor() {
        super();

        this.browser = browser;
        this.device = device;
        this.events = events;
        this.servcies = services;
        this.loader = loader;
    }

    connectedCallback() {
        start();
    }

    disconnectedCallback() {
        stop();
    }
}

customElements.define('game-engine', Engine);
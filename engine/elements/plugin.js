import { load, loadJson, loadText, loadBlob, loaders } from '../network/loader.js';
import { publish, subscribe, unsubscribe } from '../application/events.js';
import { createObject, deleteObject } from '../application/objects.js';
import { registerBehavior } from '../application/behaviors.js';
import { animations } from '../application/animation.js';

export class Plugin extends HTMLElement {
    constructor() {
        super();

        this.load = load;
        this.loadJson = loadJson;
        this.loadText = loadText;
        this.loadBlob = loadBlob;
        this.loaders = loaders;

        this.publish = publish;
        this.subscribe = subscribe;
        this.unsubscribe = unsubscribe;

        this.createObject = createObject;
        this.deleteObject = deleteObject;

        this.registerBehavior = registerBehavior;

        if (this.animate) {
            animations.add(this);
        }
    }
}
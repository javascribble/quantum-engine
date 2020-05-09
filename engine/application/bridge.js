import { load, loadJson, loadText, loadBlob, loaders } from '../network/loader.js';
import { publish, subscribe, unsubscribe } from '../application/events.js';
import { createObject, deleteObject } from '../application/objects.js';
import { registerBehavior } from '../application/behaviors.js';
import { start, stop } from '../application/services.js';

export const expose = (object) => {
    object.load = load;
    object.loadJson = loadJson;
    object.loadText = loadText;
    object.loadBlob = loadBlob;
    object.loaders = loaders;

    object.publish = publish;
    object.subscribe = subscribe;
    object.unsubscribe = unsubscribe;

    object.createObject = createObject;
    object.deleteObject = deleteObject;

    object.registerBehavior = registerBehavior;

    object.start = start;
    object.stop = stop;
};
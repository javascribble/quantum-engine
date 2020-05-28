import { animations, startAnimation, stopAnimation } from './browser.js';
import { subscribe, unsubscribe, publish } from './events.js';
import { start, stop } from './services.js';
import { profile } from './device.js';
import { loaders, loadJson, loadText, loadBlob, load, loadMany } from '../network/loader.js';
import { createEntity, deleteEntity } from '../architecture/entities.js';
import { systems } from '../architecture/systems.js';
import { assign } from '../aliases/object.js';

const api = {
    loaders,
    loadJson,
    loadText,
    loadBlob,
    load,
    loadMany,

    createEntity,
    deleteEntity,
    systems,

    animations,
    startAnimation,
    stopAnimation,

    profile,

    subscribe,
    unsubscribe,
    publish,

    start,
    stop
};

export const expose = (object) => assign(object, api);
import { subscribe, unsubscribe, publish } from './events.js';
import { loaders, loadJson, loadText, loadBlob, load, loadMany } from '../network/loader.js';
import { createEntity, deleteEntity } from '../architecture/entities.js';
import { systems } from '../architecture/systems.js';

export const api = {
    loaders,
    loadJson,
    loadText,
    loadBlob,
    load,
    loadMany,

    createEntity,
    deleteEntity,
    systems,

    subscribe,
    unsubscribe,
    publish
};
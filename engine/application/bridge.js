import { createEntity, deleteEntity } from '../architecture/entities.js';
import { systems } from '../architecture/systems.js';
import * as loader from '../network/loader.js';
import * as browser from './browser.js';
import * as device from './device.js';
import * as events from './events.js';
import * as services from './services.js';

export const expose = (object) => {
    object.createEntity = createEntity;
    object.deleteEntity = deleteEntity;
    object.systems = systems;

    object.loader = loader;

    object.browser = browser;
    object.device = device;
    object.events = events;
    object.servcies = services;
};
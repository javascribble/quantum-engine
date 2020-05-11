import * as browser from './browser.js';
import * as device from './device.js';
import * as events from './events.js';
import * as services from './services.js';
import * as loader from '../network/loader.js';
import * as entities from '../architecture/entities.js';
import { systems } from '../architecture/systems.js';
import { assign } from '../aliases/object.js';

export const expose = (object) => {
    assign(object, browser);
    assign(object, device);
    assign(object, events);
    assign(object, services);
    assign(object, loader);
    assign(object, entities);

    object.systems = systems;
};
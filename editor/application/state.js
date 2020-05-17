import { addObjects } from './objects.js';
import { addProperties } from './properties.js';
import { saveObject, loadObject } from '../storage/local.js';

export const syncState = (root) => {
    const objects = loadObject('objects') || [];

    addObjects(objects, root.querySelector('#objects'));
    addProperties(objects, root.querySelector('#properties'));
};
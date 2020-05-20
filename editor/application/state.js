import { addObjects } from './objects.js';
import { addProperties } from './properties.js';
import { saveObject, loadObject } from '../storage/local.js';

export const syncState = (root) => {
    //const state = loadObject('state') || [];
    const state = {
        "test name": {
            properties: {},
            children: {
                "test name2": {
                    properties: {},
                    children: {}
                }
            }
        }
    };

    addObjects(state, root.querySelector('#objects'));
    addProperties(state, root.querySelector('#properties'));
};
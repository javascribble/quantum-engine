import { addObjects } from './objects.js';
import { addProperties } from './properties.js';

export const syncState = (root) => {
    const state = {
        selected: false,
        name: "test entity",
        properties: {},
        children: []
    };

    addObjects(state, root.querySelector('#objects'));
    addProperties(state, root.querySelector('#properties'));
};
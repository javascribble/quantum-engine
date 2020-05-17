import { addObjects } from './objects.js';
import { addProperties } from './properties.js';

export const syncState = (root) => {
    const state = [
        {
            selected: false,
            name: "test entity1",
            properties: {},
            children: [
                {
                    selected: false,
                    name: "test entity3",
                    properties: {},
                },
                {
                    selected: false,
                    name: "test entity4",
                    properties: {},
                }
            ]
        },
        {
            selected: false,
            name: "test entity2",
            properties: {},
        }
    ];

    addObjects(state, root.querySelector('#objects'));
    addProperties(state, root.querySelector('#properties'));
};
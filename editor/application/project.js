import { saveJson, loadJson } from './storage.js';
import { addObjects } from '../controls/objects.js';
import { addProperties } from '../controls/properties.js';

export const syncProject = root => {
    //const project = loadJson('project') || [];
    const project = {
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

    addObjects(project, root.querySelector('#objects'));
    addProperties(project, root.querySelector('#properties'));
};
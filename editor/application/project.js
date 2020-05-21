import { configurePropertiesPanel } from '../controls/properties.js';
import { configureObjectPanel } from '../controls/objects.js';
import { saveJson, loadJson } from './storage.js';
import { query } from '../utilities/elements.js';

export const configureProject = root => {
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
        },
        "test name2": {
        },
        "test name3": {
        }
    };

    configureObjectPanel(project, query(root, '#objects'));
    configurePropertiesPanel(project, query(root, '#properties'));
};
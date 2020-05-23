import { saveJson, loadJson } from '../storage/local.js';
import { query } from '../utilities/elements.js';

export const configureProject = root => {
    //const project = loadJson('project') || [];

    const objects = query(root, '#objects');
    const properties = query(root, '#properties');
};
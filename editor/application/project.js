import { query } from '@javascribble/quantum';
import { saveJson, loadJson } from '../storage/local.js';

export const configureProject = root => {
    //const project = loadJson('project') || [];

    const objects = query(root, '#objects');
    const properties = query(root, '#properties');
};
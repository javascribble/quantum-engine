import { query } from '@javascribble/quantum';
import { saveJson, loadJson } from './storage.js';

export const configureProject = root => {
    const project = loadJson('project') || [];

    const tree = query(root, 'tree-component');
    tree.add(project);
};
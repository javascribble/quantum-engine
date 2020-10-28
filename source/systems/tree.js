import { renderEntityTree } from '../utilities/tree.js';

export const createTreeSystem = root => ({
    add: entity => {
        const { parent } = entity;
        if (!parent.children) {
            parent.children = new Set();
        }

        parent.children.add(entity);
    },
    render: (delta, elapsed) => {
        renderEntityTree(root, delta, elapsed);
    },
    replace: entity => {
        entity.parent.children.delete(entity);
    },
    delete: entity => {
        entity.parent.children.delete(entity);
    }
});
import { renderEntityGraph } from '../utilities/graph.js';

export const createGraphSystem = root => ({
    add: entity => {
        const { parent } = entity;
        if (!parent.children) {
            parent.children = new Set();
        }

        parent.children.add(entity);
    },
    render: (delta, elapsed) => {
        renderEntityGraph(root, delta, elapsed);
    },
    replace: entity => {
        entity.parent.children.delete(entity);
    },
    delete: entity => {
        entity.parent.children.delete(entity);
    }
});
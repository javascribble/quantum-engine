import { applyDepthAction, applyReverseDepthAction } from '../structures/tree.js';

export const initializeScene = async (api, options) => {
    const { systems, broker, createEntity, deleteEntity } = api;
    const { scenes, defaultScenes } = options;

    const root = { children: new Set() };
    api.clearScene = () => applyReverseDepthAction(root, deleteEntity);
    api.applyScene = async index => {
        const scene = scenes[index];
        const entities = [];
        for (const entity of scene.entities) {
            entities.push(await createEntity({ ...entity, parent: 'parent' in entity ? entities[entity.parent] : root }));
        }
    };

    systems.push({
        validate: entity => 'parent' in entity,
        add: entity => {
            const { parent } = entity;
            if (!parent.children) {
                parent.children = new Set();
            }

            parent.children.add(entity);
        },
        remove: entity => entity.parent.children.delete(entity)
    });

    for (const scene of defaultScenes) {
        await api.applyScene(scene);
    }

    broker.subscribe('animate', (delta, elapsed) => applyDepthAction(root, entity => entity.update?.(delta, elapsed)));
};
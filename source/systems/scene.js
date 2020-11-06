import { applyReverseDepthAction } from '../structures/tree.js';

export const initializeScene = async (api, options) => {
    const { systems, createEntity, deleteEntity } = api;
    const { scenes, defaultScenes } = options;

    const root = { children: new Set() };
    api.applyScene = index => applyReverseDepthAction(await createEntity({ ...scenes[index], parent: root }), (parent, child) => createEntity()));
    api.clearScene = () => applyExclusiveReverseDepthAction(root, deleteEntity);

    for (const scene of defaultScenes) {
        await api.applyScene(scene);
    }

    //broker.subscribe('animate', time => applyInclusiveReverseDepthAction(root, entity => entity.update?.(time)));

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
};
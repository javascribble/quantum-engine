import { applyTreeAction } from '../structures/tree.js';

export const createSceneSystem = async (api, options, createEntity, deleteEntity) => {
    const { loadResources } = api;
    const { scenes, defaultScenes } = options;

    const root = { children: new Set() };
    api.loadScene = index => loadResources(scenes[index].resources);
    api.applyScene = index => scenes[index].entities.forEach(entity => applyTreeAction(entity, createEntity));
    api.clearScene = () => root.children.forEach(scene => applyTreeAction(scene, deleteEntity));

    for (const scene of defaultScenes) {
        await api.loadScene(scene);
        api.applyScene(scene);
    }

    return {
        update: (delta, elapsed) => applyTreeAction(root, node => node.update?.(delta, elapsed)),
        validate: entity => entity.hasOwnProperty('parent'),
        add: entity => entity.parent.children.add(entity),
        remove: entity => entity.parent.children.delete(entity)
    }
};
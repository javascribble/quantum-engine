import { applyTreeAction } from '../structures/tree.js';

export const createSceneSystem = (createEntity, deleteEntity) => {
    const root = { children: new Set() };
    return {
        load: async (api, options) => {
            const { scenes, defaultScenes, resources, resourceRoot } = options;

            // const resourcePaths = resources.map(resource => `${resourceRoot}/${resource}`);
            // const activeResources = [resources.length]; // TODO: Cache invalidation.

            // engine.resources = activeResources;
            // engine.loadResources = async indices => {
            //     const loadedResources = await this.load(indices.map(index => resourcePaths[index]));
            //     for (let i = 0; i < loadedResources.length; i++) {
            //         activeResources[indices[i]] = loadedResources[i];
            //     }
            // };

            // engine.loadScene = index => engine.loadResources(scenes[index].resources);
            // engine.applyScene = index => scenes[index].entities.forEach(entity => applyTreeAction(entity, createEntity));
            // engine.clearScene = () => root.children.forEach(scene => applyTreeAction(scene, deleteEntity));

            // for (const scene of defaultScenes) {
            //     await engine.loadScene(scene);
            //     engine.applyScene(scene);
            // }
        },
        update: (delta, elapsed) => applyTreeAction(root, node => node.update?.(delta, elapsed)),
        validate: entity => entity.hasOwnProperty('parent'),
        add: entity => entity.parent.children.add(entity),
        replace: entity => entity.parent.children.delete(entity),
        remove: entity => entity.parent.children.delete(entity)
    }
};
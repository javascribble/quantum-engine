import { applyTreeAction } from '../structures/tree.js';

export const createSceneSystem = async (engine, options) => {
    const { systems, createEntity, deleteEntity } = engine;
    const { scenes, defaultScenes, resources, resourceRoot } = options;

    const resourcePaths = resources.map(resource => `${resourceRoot}/${resource}`);
    const activeResources = [resources.length]; // TODO: Cache invalidation.

    engine.resources = activeResources;
    engine.loadResources = async indices => {
        const loadedResources = await this.load(indices.map(index => resourcePaths[index]));
        for (let i = 0; i < loadedResources.length; i++) {
            activeResources[indices[i]] = loadedResources[i];
        }
    };

    const root = { children: new Set() };
    systems.set('parent', {
        add: entity => {
            entity.parent.children.add(entity);
        },
        update: (delta, elapsed) => {
            applyTreeAction(root, node => node.update?.(delta, elapsed));
        },
        replace: entity => {
            entity.parent.children.delete(entity);
        },
        delete: entity => {
            entity.parent.children.delete(entity);
        }
    });

    engine.loadScene = index => engine.loadResources(scenes[index].resources);
    engine.applyScene = index => scenes[index].entities.forEach(entity => applyTreeAction(entity, createEntity));
    engine.clearScene = () => root.children.forEach(scene => applyTreeAction(scene, deleteEntity));

    for (const scene of defaultScenes) {
        await engine.loadScene(scene);
        engine.applyScene(scene);
    }
};
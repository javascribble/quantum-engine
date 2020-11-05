import { createEntityManager } from '../architecture/entity.js';
import { createInputSystem } from '../systems/input.js';
import { createSpriteSystem } from '../systems/sprite.js';
import { createSceneSystem } from '../systems/scene.js';
import { Engine } from '../elements/engine.js';

Engine.prototype.run = async (api, state, options) => {
    const { resources, resourceRoot } = options;
    const resourcePaths = resources.map(resource => `${resourceRoot}/${resource}`);
    const activeResources = [resources.length]; // TODO: Cache invalidation.

    api.resources = activeResources;
    api.loadResources = async indices => {
        const loadedResources = await api.loadMany(indices.map(index => resourcePaths[index]));
        for (let i = 0; i < loadedResources.length; i++) {
            activeResources[indices[i]] = loadedResources[i];
        }
    };

    const { systems, createEntity, deleteEntity } = createEntityManager();
    systems.add(await createInputSystem(api, state, options, createEntity, deleteEntity));
    systems.add(await createSpriteSystem(api, state, options, createEntity, deleteEntity));
    systems.add(await createSceneSystem(api, state, options, createEntity, deleteEntity));
    return (delta, elapsed) => !!systems.forEach(system => system.update?.(delta, elapsed));
};
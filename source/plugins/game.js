import { createEntityManager } from '../architecture/entity.js';
import { createAudioSystem } from '../systems/audio.js';
import { createInputSystem } from '../systems/input.js';
import { createNetworkSystem } from '../systems/network.js';
import { createResourceSystem } from '../systems/resource.js';
import { createSceneSystem } from '../systems/scene.js';
import { createStorageSystem } from '../systems/storage.js';
import { createVideoSystem } from '../systems/video.js';
import { Engine } from '../elements/engine.js';

Engine.prototype.onloaded = async (api, options) => {
    const { systems, createEntity, deleteEntity } = createEntityManager();
    systems.add(await createResourceSystem(api, options, createEntity, deleteEntity));
    systems.add(await createInputSystem(api, options, createEntity, deleteEntity));
    systems.add(await createStorageSystem(api, options, createEntity, deleteEntity));
    systems.add(await createAudioSystem(api, options, createEntity, deleteEntity));
    systems.add(await createVideoSystem(api, options, createEntity, deleteEntity));
    systems.add(await createNetworkSystem(api, options, createEntity, deleteEntity));
    systems.add(await createSceneSystem(api, options, createEntity, deleteEntity));
    return (delta, elapsed) => systems.forEach(system => system.update?.(delta, elapsed));
};
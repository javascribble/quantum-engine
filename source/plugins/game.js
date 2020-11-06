import { initializeECS } from '../architecture/ecs.js';
import { initializeAudio } from '../systems/audio.js';
import { initializeInput } from '../systems/input.js';
import { initializeNetwork } from '../systems/network.js';
import { initializeResources } from '../systems/resources.js';
import { initializeScene } from '../systems/scene.js';
import { initializeStorage } from '../systems/storage.js';
import { initializeVideo } from '../systems/video.js';
import { Engine } from '../elements/engine.js';

Engine.prototype.onloaded = async (api, options) => {
    Object.assign(api, initializeECS());
    await initializeResources(api, options);
    await initializeInput(api, options);
    await initializeStorage(api, options);
    await initializeAudio(api, options);
    await initializeVideo(api, options);
    await initializeNetwork(api, options);
    await initializeScene(api, options);
};
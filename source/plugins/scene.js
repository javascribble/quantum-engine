import { createEntityGraph, deleteEntityGraph } from '../utilities/graph.js';
import { createGraphSystem } from '../systems/graph.js';
import { Engine } from '../elements/engine.js';

const next = Engine.prototype.integrate;
Engine.prototype.integrate = async function (api) {
    const { options, systems, createEntity, deleteEntity } = api;
    const { scenes, defaultScenes } = options;

    const scene = createEntity();
    systems.set('parent', createGraphSystem(scene));

    const loadScene = index => api.loadResources(scenes[index].resources);
    const applyScene = index => createEntityGraph(scenes[index].entities, scene, createEntity);
    const clearScene = () => deleteEntityGraph(scene, deleteEntity);

    defaultScenes.forEach(applyScene);

    api.loadScene = loadScene;
    api.applyScene = applyScene;
    api.clearScene = clearScene;
    await next?.call(this, api);
};
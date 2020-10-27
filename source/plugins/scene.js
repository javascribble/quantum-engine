import { Engine } from '../elements/engine.js';

const next = Engine.prototype.integrate;
Engine.prototype.integrate = async function (api) {
    const { options, createEntity, deleteEntity } = api;
    const entities = new Set();

    const loadScene = index => api.loadResources(options.scenes[index].resources);
    const applyScene = index => options.scenes[index].entities.map(entity => entities.add(createEntity(entity)));
    const clearScene = () => entities.forEach(deleteEntity);

    options.defaultScenes.forEach(applyScene);

    api.loadScene = loadScene;
    api.applyScene = applyScene;
    api.clearScene = clearScene;
    await next?.call(this, api);
};
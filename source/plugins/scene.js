import { Engine } from '../elements/engine.js';

const next = Engine.prototype.integrate;
Engine.prototype.integrate = function (api) {
    const { options, createEntity, deleteEntity } = api;
    const scenes = new Map();

    const createScene = scene => scenes.set(scene, createEntity(options.scenes[scene]));
    const deleteScene = scene => deleteEntity(scenes.remove(scene));
    const clearScene = () => scenes.keys().forEach(deleteScene);

    options.defaultScenes.forEach(createScene);

    api.createScene = createScene;
    api.deleteScene = deleteScene;
    api.clearScene = clearScene;
    next?.call(this, api);
};
import { createEntityTree, deleteEntityTree } from '../utilities/tree.js';
import { createTreeSystem } from '../systems/tree.js';
import { Engine } from '../elements/engine.js';

const next = Engine.prototype.integrate;
Engine.prototype.integrate = async function (api) {
    const { options, systems, createEntity, deleteEntity } = api;
    const { scenes, defaultScenes } = options;

    const root = createEntity();
    systems.set('parent', createTreeSystem(root));

    const loadScene = index => api.loadResources(scenes[index].resources);
    const applyScene = index => createEntityTree(scenes[index].entities, root, createEntity);
    const clearScene = () => deleteEntityTree(root, deleteEntity);

    defaultScenes?.forEach(applyScene);

    api.loadScene = loadScene;
    api.applyScene = applyScene;
    api.clearScene = clearScene;
    await next?.call(this, api);
};
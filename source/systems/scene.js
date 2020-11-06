import { applyTreeAction } from '../structures/tree.js';

export const initializeScene = async (api, options) => {
    const { systems, createEntity, deleteEntity, loadResources } = api;
    const { scenes, defaultScenes } = options;

    const scene = scenes[0];
    await createEntity(scene);
    console.log('test');

    // const root = { children: new Set() };
    // api.loadScene = index => loadResources(scenes[index].resources);
    // api.applyScene = index => scenes[index].entities.forEach(entity => applyTreeAction(entity, createEntity));
    // api.clearScene = () => root.children.forEach(scene => applyTreeAction(scene, deleteEntity));

    // for (const scene of defaultScenes) {
    //     await api.loadScene(scene);
    //     api.applyScene(scene);
    // }

    // systems.push({
    //     update: (delta, elapsed) => applyTreeAction(root, node => node.update?.(delta, elapsed)),
    //     validate: entity => entity.hasOwnProperty('parent'),
    //     add: entity => entity.parent.children.add(entity),
    //     remove: entity => entity.parent.children.delete(entity)
    // });
};
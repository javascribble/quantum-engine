export const enableScenePlugin = engine => {
    const { attachSystem, canvas } = engine;

    attachSystem({
        validate: entity => 'scene' in entity,
        add: entity => {
            entity.scenes.forEach(engine.attachEntity);
        },
        update: (entities, time) => {
            for (const { scene, scenes } of entities) {
                canvas.drawImageTree(scenes[scene], 'children');
            }
        },
        remove: entity => {
            entity.scenes.forEach(engine.detachEntity);
        }
    });
};
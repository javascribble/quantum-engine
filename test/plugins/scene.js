export const enableScenePlugin = engine => {
    const { attachSystem, canvas } = engine;

    attachSystem({
        validate: entity => 'scene' in entity,
        update: (entities, time) => {
            for (const { scene, scenes } of entities) {
                canvas.drawImageTree(scenes[scene], 'children');
            }
        }
    });
};
export const enableScenePlugin = (engine, state) => {
    const { canvas } = engine;
    const { systems } = state;

    systems.push({
        validate: entity => 'scene' in entity,
        update: (entities, time) => {
            for (const { scene, scenes } of entities) {
                canvas.drawImageTree(scenes[scene], 'children');
            }
        }
    });
};
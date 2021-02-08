export const enableScenePlugin = api => {
    api.attachSystem({
        validate: entity => 'scene' in entity,
        add: entity => {
            entity.scenes.forEach(api.attachEntity);
        },
        update: (entities, time) => {
            for (const { scene, scenes } of entities) {
                api.drawImageTree(scenes[scene], 'children');
            }
        },
        remove: entity => {
            entity.scenes.forEach(api.detachEntity);
        }
    });
};
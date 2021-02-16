export const enableGamePlugin = engine => {
    engine.canvas.setResolution();
    engine.attachSystem({
        validate: entity => 'children' in entity,
        update: (entities, time) => {
            if (!entity.initialized) {
                engine.attachEntity(entity.world);
                engine.attachEntity(entity.player);
                engine.querySelector('button').addEventListener('click', event => {
                    Object.assign(entity.player, entity.player)
                });

                entity.initialized = true;
            }
        }
    });
};
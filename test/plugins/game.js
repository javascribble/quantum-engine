export const enableGamePlugin = (engine, state) => {
    const { canvas } = engine;
    const { systems, entities } = state;

    canvas.setResolution();
    systems.push({
        validate: entity => 'children' in entity,
        update: (entities, time) => {
            // if (!entity.initialized) {
            //     engine.attachEntity(entity.world);
            //     engine.attachEntity(entity.player);
            //     entity.initialized = true;
            // }
        }
    });

    // engine.querySelector('button').addEventListener('click', event => {
    //     Object.assign(entity.player.sprite, entity.player.spawn)
    // });
};
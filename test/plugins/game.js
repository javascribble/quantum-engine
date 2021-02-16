export const enableGamePlugin = engine => {
    engine.canvas.setResolution();
    engine.attachSystem({
        validate: entity => 'children' in entity,
        add: entity => {
            entity.children.forEach(engine.attachEntity);

            engine.querySelector('button').addEventListener('click', event => {
                const player = entity.children[1];
                engine.detachEntity(player);
                engine.attachEntity(player);
            });
        }
    });
};
export const enablePlayerPlugin = engine => {
    const { attachSystem, input } = engine;
    attachSystem({
        validate: entity => 'player' in entity,
        add: entity => Object.assign(entity, entity.player),
        update: (entities, time) => {
            for (const entity of entities) {
                if (input.getButton('ArrowUp')) {
                    entity.dy -= 5;
                } else if (input.getButton('ArrowDown')) {
                    entity.dy += 5;
                } else if (input.getButton('ArrowLeft')) {
                    entity.dx -= 5;
                } else if (input.getButton('ArrowRight')) {
                    entity.dx += 5;
                }
            }
        }
    });
};
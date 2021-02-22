export const enablePlayerPlugin = (engine, state) => {
    const { input } = engine;
    const { systems } = state;

    systems.push({
        validate: entity => 'player' in entity,
        update: (entities, time) => {
            for (const { sprite } of entities) {
                if (input.getButton('ArrowUp')) {
                    sprite.dy -= 5;
                } else if (input.getButton('ArrowDown')) {
                    sprite.dy += 5;
                } else if (input.getButton('ArrowLeft')) {
                    sprite.dx -= 5;
                } else if (input.getButton('ArrowRight')) {
                    sprite.dx += 5;
                }
            }
        }
    });
};
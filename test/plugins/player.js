Quantum.Engine.plugins.add(api => {
    api.attachSystem({
        validate: entity => 'player' in entity,
        add: entity => Object.assign(entity, entity.player),
        update: (entities, time) => {
            for (const entity of entities) {
                if (api.getButton('ArrowUp')) {
                    entity.dy -= 5;
                } else if (api.getButton('ArrowDown')) {
                    entity.dy += 5;
                } else if (api.getButton('ArrowLeft')) {
                    entity.dx -= 5;
                } else if (api.getButton('ArrowRight')) {
                    entity.dx += 5;
                }
            }
        }
    });
});
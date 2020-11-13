export default async (api, options) => {
    api.createSystem({
        validate: entity => 'camera' in entity,
        update: (entities, time) => {
            for (const entity of entities) {
                api.drawSprite(entity);
            }
        }
    });

    api.createSystem({
        validate: entity => 'player' in entity,
        update: (entities, time) => {
            for (const entity of entities) {
                if (api.getButton('ArrowDown')) {
                    entity.dx += 10;
                }
            }
        }
    });

    api.createSystem({
        validate: entity => 'image' in entity,
        update: (entities, time) => {
            for (const entity of entities) {
                api.drawSprite(entity);
            }
        }
    });

    api.createSystem({
        validate: entity => 'divisor' in entity,
        construct: entity => {
            api.calculateTiles(entity.children, entity.divisor);
        },
        update: (entities, time) => {
        }
    });

    await api.loadEntities(options.entities);
    return time => {
        api.updateSystems(time);
        return true;
    };
};
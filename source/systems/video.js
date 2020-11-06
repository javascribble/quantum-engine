const spriteType = {
    view: 0,
    map: 1
};

export const createVideoSystem = (api, options, createEntity, deleteEntity) => {
    const { resources, createSpriteMap, importUniformSheet } = api;
    const { sprites, spriteViews, spriteMaps } = options;

    const entities = new Set();
    return {
        update: (delta, elapsed) => {
            entities.forEach(entity => {
                const { sprite } = entity;
                switch (sprite.type) {
                    case spriteType.view:
                        api.drawSprite(entity.sprite);
                        break;
                    case spriteType.map:
                        sprite.tiles.forEach(api.drawSprite);
                        break;
                }
            });
        },
        validate: entity => entity.hasOwnProperty('sprite'),
        add: entity => {
            const { sprite } = entity;
            switch (sprite.type) {
                case spriteType.view:
                    const spriteViewResource = spriteViews[sprite.resource];
                    const spriteResource = sprites[spriteViewResource.sprite];
                    Object.assign(sprite, spriteResource, spriteViewResource, { image: resources[spriteResource.image] });
                    break;
                case spriteType.map:
                    const spriteMapResource = spriteMaps[sprite.resource];
                    const sheet = importUniformSheet(resources[spriteMapResource.image], spriteMapResource.width, spriteMapResource.height);
                    sprite.tiles = createSpriteMap(sheet, spriteMapResource.sprites, spriteMapResource.divisor);
                    break;
            };

            entities.add(entity);
        },
        replace: entity => {
        },
        remove: entity => {
            entities.delete(entity);
        }
    };
};
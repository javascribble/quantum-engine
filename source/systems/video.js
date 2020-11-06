export const initializeVideo = async (api, options) => {
    const { systems, addComponent, drawSprite, createSpriteMap, importUniformSheet } = api;
    const { sprites, spriteViews, spriteMaps } = options;

    systems.push({
        validate: entity => 'spriteView' in entity,
        add: async entity => {
            const spriteView = spriteViews[entity.spriteView];
            const sprite = sprites[spriteView.sprite];
            Object.assign(entity, sprite, spriteView, { resource: 'image', update: () => drawSprite(entity) });
            await addComponent(entity);
        },
        remove: entity => {
        }
    });

    systems.push({
        validate: entity => 'spriteMap' in entity,
        add: entity => {
            const spriteMap = spriteMaps[entity.spriteMap];
            // const sheet = importUniformSheet(resources[spriteMap.image], spriteMapResource.width, spriteMapResource.height);
            // sprite.tiles = createSpriteMap(sheet, spriteMapResource.sprites, spriteMapResource.divisor);
            // Object.assign(entity, sprite, spriteView, { resource: 'image', update: () => sprite.tiles.forEach(drawSprite) });
            //await addComponent(entity);
        },
        remove: entity => {
        }
    });
};
export const initializeVideo = async (api, options) => {
    const { systems, addComponent, drawSprite, createSpriteMap, importUniformSheet } = api;
    const { sprites, spriteViews, spriteMaps } = options;

    systems.push({
        validate: entity => 'spriteView' in entity,
        add: async entity => {
            const spriteView = spriteViews[entity.spriteView];
            const sprite = sprites[spriteView.sprite];
            Object.assign(entity, sprite, spriteView, { resource: 'image' });
            await addComponent(entity);

            entity.update = () => drawSprite(entity);
        },
        remove: entity => {
        }
    });

    systems.push({
        validate: entity => 'spriteMap' in entity,
        add: async entity => {
            const spriteMap = spriteMaps[entity.spriteMap];
            Object.assign(entity, spriteMap, { resource: 'image' });
            await addComponent(entity);

            const sheet = importUniformSheet(entity.image, spriteMap.width, spriteMap.height);
            const tiles = createSpriteMap(sheet, spriteMap.sprites, spriteMap.divisor);
            entity.update = () => tiles.forEach(drawSprite);
        },
        remove: entity => {
        }
    });
};
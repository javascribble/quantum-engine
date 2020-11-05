export const createSpriteSystem = (api, state, options) => {
    const { resources, createSpriteView, createSpriteMap } = api;
    const { sprites, spriteViews, spriteMaps } = options;

    return {
        update: (delta, elapsed) => {
        },
        validate: entity => {
        },
        add: entity => {
            const { sprite } = entity;
            switch (sprite.type) {
                case spriteType.view:
                    sprite.drawable = createSpriteView(sprite.resource, sprites, spriteViews, resources);
                    entity.render = () => engine.drawSprite(sprite.drawable);
                    break;
                case spriteType.map:
                    sprite.drawable = createSpriteMap(sprite.resource, sprites, spriteMaps, resources);
                    entity.render = () => sprite.drawable.map(drawable => engine.drawSprite(drawable));
                    break;
            };
        },
        replace: entity => {
        },
        remove: entity => {
            delete entity.render;
        }
    };
};
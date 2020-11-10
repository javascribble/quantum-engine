const applyDepthAction = async (parent, action) => {
    if (parent.children) {
        for (const child of parent.children) {
            await action(child);
            await applyDepthAction(child, action);
        }
    }
};

const applyReverseDepthAction = async (parent, action) => {
    if (parent.children) {
        for (const child of parent.children) {
            await applyReverseDepthAction(child, action);
            await action(child);
        }
    }
};

const initializeScene = async (state, options) => {
    const { systems, broker, createEntity, deleteEntity } = state;
    const { scenes, defaultScenes } = options;

    const root = { children: new Set() };
    state.clearScene = () => applyReverseDepthAction(root, deleteEntity);
    state.applyScene = async index => {
        const scene = scenes[index];
        const entities = [];
        for (const entity of scene.entities) {
            entities.push(await createEntity({ ...entity, parent: 'parent' in entity ? entities[entity.parent] : root }));
        }
    };

    systems.push({
        validate: entity => 'parent' in entity,
        add: entity => {
            const { parent } = entity;
            if (!parent.children) {
                parent.children = new Set();
            }

            parent.children.add(entity);
        },
        remove: entity => entity.parent.children.delete(entity)
    });

    for (const scene of defaultScenes) {
        await state.applyScene(scene);
    }

    broker.subscribe('animate', time => applyDepthAction(root, entity => entity.update?.(time)));
};

function importUniformSheet(image, sw, sh = sw) {
    const sprites = [];
    for (let row = 0; row < image.height / sh; row++) {
        for (let column = 0; column < image.width / sw; column++) {
            sprites.push({ image, sx: column * sh, sy: row * sh, sw, sh });
        }
    }

    return sprites;
}

function createSpriteMap(sprites, data, divisor) {
    const map = [];
    for (let index = 0; index < data.length; index++) {
        const sprite = sprites[data[index]];
        map.push(this.createSpriteView(sprite, sprite.sw * (index % divisor), sprite.sh * Math.floor(index / divisor)))
    }

    return map;
};

const initializeVideo = async (state, options) => {
    const { systems, addComponent, drawSprite, createSpriteMap, importUniformSheet } = state;
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

export default [];
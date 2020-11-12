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

const importUniformSheet = (image, sw, sh = sw) => {
    const sprites = [];
    for (let row = 0; row < image.height / sh; row++) {
        for (let column = 0; column < image.width / sw; column++) {
            sprites.push({ image, sx: column * sh, sy: row * sh, sw, sh });
        }
    }

    return sprites;
}

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
            const divisor = entity.divisor;
            const children = entity.children;
            for (let index = 0; index < children.length; index++) {
                const child = children[index];
                child.dx = child.sw * (index % divisor);
                child.dy = child.sh * Math.floor(index / divisor);
                child.dw = child.sw;
                child.dh = child.sh;
            }
        },
        update: (entities, time) => {
        }
    });

    api.createEntity(await api.loadPrototype(options.defaultPrototype));

    return time => {
        api.updateSystems(time);
        return true;
    };
};
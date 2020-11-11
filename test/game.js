// const applyDepthAction = async (parent, action) => {
//     if (parent.children) {
//         for (const child of parent.children) {
//             await action(child);
//             await applyDepthAction(child, action);
//         }
//     }
// };

// const applyReverseDepthAction = async (parent, action) => {
//     if (parent.children) {
//         for (const child of parent.children) {
//             await applyReverseDepthAction(child, action);
//             await action(child);
//         }
//     }
// };

// const importUniformSheet = (image, sw, sh = sw) => {
//     const sprites = [];
//     for (let row = 0; row < image.height / sh; row++) {
//         for (let column = 0; column < image.width / sw; column++) {
//             sprites.push({ image, sx: column * sh, sy: row * sh, sw, sh });
//         }
//     }

//     return sprites;
// }

// const createSpriteMap = (sprites, data, divisor) => {
//     const map = [];
//     for (let index = 0; index < data.length; index++) {
//         const sprite = sprites[data[index]];
//         map.push(this.createSpriteView(sprite, sprite.sw * (index % divisor), sprite.sh * Math.floor(index / divisor)))
//     }

//     return map;
// };

export default async (api, options) => {
    api.createSystem({
        validate: entity => 'image' in entity,
        update: (entities, time) => {
            for (const entity of entities) {
                api.drawSprite(entity);
            }
        }
    });

    api.updateEntity(api.createEntity(await api.loadPrototype(options.defaultPrototype)));

    return time => {
        api.updateSystems(time);
        return true;
    };
};
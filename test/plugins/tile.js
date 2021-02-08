const importUniformSpritesheet = (source, sw, sh = sw) => {
    const sprites = [];
    for (let row = 0; row < source.height / sh; row++) {
        for (let column = 0; column < source.width / sw; column++) {
            sprites.push({ source, sx: column * sh, sy: row * sh, sw, sh });
        }
    }

    return sprites;
};

Quantum.Engine.plugins.add(api => {
    api.attachSystem({
        validate: entity => 'tileset' in entity,
        add: entity => {
            const { tileset, indices, divisor } = entity;
            const { sheet, size } = tileset;

            const children = [];
            const sprites = importUniformSpritesheet(sheet, size);
            for (let index = 0; index < indices.length; index++) {
                const tile = { ...sprites[indices[index]] };
                tile.dx = tile.sw * (index % divisor);
                tile.dy = tile.sh * Math.floor(index / divisor);
                tile.dw = tile.sw;
                tile.dh = tile.sh;
                children.push(tile);
            }

            entity.children = children;
        }
    });
});
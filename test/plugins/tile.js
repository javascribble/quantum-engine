export const enableTilePlugin = api => {
    api.attachSystem({
        validate: entity => 'tileset' in entity,
        add: entity => {
            const { tileset, divisor } = entity;
            const { sheet, size } = tileset;

            const sprites = [];
            for (let row = 0; row < sheet.height / size; row++) {
                for (let column = 0; column < sheet.width / size; column++) {
                    sprites.push({ source: sheet, sx: column * size, sy: row * size, sw: size, sh: size });
                }
            }

            const indices = [];
            for (let i = 0; i < divisor; i++) {
                for (let ii = 0; ii < divisor; ii++) {
                    indices.push(Math.round(Math.random()));
                }
            }

            const children = [];
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
};
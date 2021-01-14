export const enableTilesPlugin = api => {
    api.calculateTilemap = (tiles, divisor) => {
        for (let index = 0; index < tiles.length; index++) {
            const tile = tiles[index];
            tile.dx = tile.sw * (index % divisor);
            tile.dy = tile.sh * Math.floor(index / divisor);
            tile.dw = tile.sw;
            tile.dh = tile.sh;
        }
    };

    api.importUniformTilesheet = (image, sw, sh = sw) => {
        const sprites = [];
        for (let row = 0; row < image.height / sh; row++) {
            for (let column = 0; column < image.width / sw; column++) {
                sprites.push({ image, sx: column * sh, sy: row * sh, sw, sh });
            }
        }

        return sprites;
    };
};
export class Game extends HTMLElement {
    integrate(api) {
        const { options, broker } = api;

        api.drawTiles = (source, images) => {
            const tiles = [];
            const { mapWidth, mapHeight, tileWidth, tileHeight, tileSets } = source;
            for (const { tileCount, columns } of tileSets) {
                for (let count = 0; count < tileCount; count++) {
                    const column = count % columns;
                    const row = Math.floor(count / columns);
                    tiles.push({
                        image: images[1],
                        sx: column * tileWidth,
                        sy: row * tileHeight,
                        sw: tileWidth,
                        sh: tileHeight,
                        dx: 0,
                        dy: 0,
                        dw: tileWidth,
                        dh: tileHeight
                    });
                }
            }

            for (const { data } of source.layers) {
                for (let row = 0; row < mapHeight; row++) {
                    for (let column = 0; column < mapWidth; column++) {
                        const sprite = tiles[data[row * mapWidth + column] - 1];
                        sprite.dx = column * tileWidth;
                        sprite.dy = row * tileHeight;
                        api.drawSprite(sprite);
                    }
                }
            }
        };

        quantum.loadMany(options.resources.map(resource => `${options.resourcePath}/${resource}`), console.log).then(resources => {
            const sprite = { ...options.sprites[0], image: resources[0] };

            broker.subscribe('MoveUp', _ => sprite.dy -= 10);
            broker.subscribe('MoveDown', _ => sprite.dy += 10);
            broker.subscribe('MoveLeft', _ => sprite.dx -= 10);
            broker.subscribe('MoveRight', _ => sprite.dx += 10);

            quantum.animate(() => {
                api.drawTiles(options.map, resources);
                api.drawSprite(sprite);
                return true;
            });
        });
    }
}

customElements.define('quantum-game', Game);
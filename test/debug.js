import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-loader/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/node_modules/@javascribble/quantum-keyboard/source/main.js';
import '/node_modules/@javascribble/quantum-tiles/source/main.js';
import '/source/main.js';

const engine = document.querySelector('quantum-engine');
engine.onload = api => {
    api.loadMany(api.options.resources.map(resource => `${api.options.resourcePath}/${resource}`), console.log).then(resources => {
        const sprite = { ...api.options.sprites[0], image: resources[0] };

        api.broker.subscribe('MoveUp', _ => sprite.dy -= 10);
        api.broker.subscribe('MoveDown', _ => sprite.dy += 10);
        api.broker.subscribe('MoveLeft', _ => sprite.dx -= 10);
        api.broker.subscribe('MoveRight', _ => sprite.dx += 10);

        quantum.animate(() => {
            api.drawTiles(api.options.map, resources);
            api.drawSprite(sprite);
            return true;
        });
    });

    document.body.style.visibility = 'visible';
};
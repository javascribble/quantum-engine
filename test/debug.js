import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/node_modules/@javascribble/quantum-keyboard/source/main.js';
import '/node_modules/@javascribble/quantum-loader/source/main.js';
import '/source/main.js';

const engine = document.querySelector('quantum-engine');
engine.onload = () => {
    quantum.load('/test/resources/engine.json').then(options => {
        quantum.loadMany(options.resources, console.log).then(resources => {
            const image = { ...options.sprites[0], image: resources[0] };

            engine.keyboard.loadSchemata(options.keyboard.schemata, engine.events.publish.bind(engine.events));
            engine.keyboard.applySchema('test');

            engine.events.subscribe('MoveUp', _ => image.dy -= 10);
            engine.events.subscribe('MoveDown', _ => image.dy += 10);
            engine.events.subscribe('MoveLeft', _ => image.dx -= 10);
            engine.events.subscribe('MoveRight', _ => image.dx += 10);

            const canvas = engine.video;
            quantum.animate((delta, elapsed) => {
                canvas.drawImages([image]);
                return true;
            });
        });
    });
};

document.body.style.visibility = 'visible'; 
import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/node_modules/@javascribble/quantum-keyboard/source/main.js';
import '/node_modules/@javascribble/quantum-loader/source/main.js';
import '/source/main.js';

const engine = document.querySelector('quantum-engine');
engine.onload = () => {
    const resources = [
        "/test/resources/kal256.png",
        "/test/resources/sprite.json"
    ];

    engine.loader.loadMany(resources, console.log).then(resources => {
        const state = { ...resources[1], image: resources[0] };

        const keyboard = engine.keyboard;
        keyboard.keys.set('ArrowUp', {
            down: event => state.dy -= 10
        });

        keyboard.keys.set('ArrowDown', {
            down: event => state.dy += 10
        });

        keyboard.keys.set('ArrowLeft', {
            down: event => state.dx -= 10
        });

        keyboard.keys.set('ArrowRight', {
            down: event => state.dx += 10
        });

        const canvas = engine.video;
        quantum.animate((delta, elapsed) => {
            canvas.drawImages([state]);
            return true;
        });
    });
};

document.body.style.visibility = 'visible'; 
import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-canvas/source/main.js';
import '/node_modules/@javascribble/quantum-keyboard/source/main.js';
import '/node_modules/@javascribble/quantum-loader/source/main.js';
import '/source/main.js';

const resources = [
    "/test/resources/kal256.png",
    "/test/resources/sprite.json"
];

const engine = document.querySelector('quantum-engine');
engine.onload = () => {
    engine.loadMany(resources, console.log).then(resources => {
        const state = { ...resources[1], image: resources[0] };

        const keyboard = document.querySelector('quantum-keyboard');
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

        const canvas = document.querySelector('quantum-canvas');
        quantum.animate((delta, elapsed) => {
            canvas.drawImages([state]);
            return true;
        });
    });
};

document.body.style.visibility = 'visible'; 
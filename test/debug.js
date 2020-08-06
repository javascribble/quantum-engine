import '/node_modules/@javascribble/quantum/source/main.js';
import '/node_modules/@javascribble/quantum-loader/source/main.js';
import { canvasBrokerAdapter } from '/node_modules/@javascribble/quantum-canvas/source/main.js';
import { Keyboard, keyboardBrokerAdapter } from '/node_modules/@javascribble/quantum-keyboard/source/main.js';
import '/source/main.js';

const engine = document.querySelector('quantum-engine');
const canvas = document.querySelector('quantum-canvas');
const keyboard = new Keyboard();
keyboard.subscribe();

quantum.load('/test/resources/options.json').then(options => {
    canvasBrokerAdapter.adapt(canvas, engine.broker, {})
    keyboardBrokerAdapter.adapt(keyboard, engine.broker, options.keyboard);

    quantum.loadMany(options.loader.resources, console.log).then(resources => {
        const sprite = { ...options.canvas[0], image: resources[0] };

        engine.broker.subscribe('MoveUp', _ => sprite.dy -= 10);
        engine.broker.subscribe('MoveDown', _ => sprite.dy += 10);
        engine.broker.subscribe('MoveLeft', _ => sprite.dx -= 10);
        engine.broker.subscribe('MoveRight', _ => sprite.dx += 10);

        engine.broker.publish('drawSprite', sprite);

        document.body.style.visibility = 'visible';
    });
});
import { listeners } from '../application/browser';
import { updates } from '../application/host';

const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

updates.add({
    update: (deltaTime) => {
        for (const gamepad of gamepads) {
            // TODO: Publish updates to buttons and axes.
        }
    }
});

const onGamepadConnected = (event) => {
    gamepads.add(event.gamepad);
};

const onGamepadDisconnected = (event) => {
    gamepads.delete(event.gamepad);
};

listeners.set('ongamepadconnected', onGamepadConnected);
listeners.set('ongamepaddisconnected', onGamepadDisconnected);
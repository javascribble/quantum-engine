import { assign } from '../utilities/objects';
import { addListener } from '../application/browser';
import { publish } from '../application/events';
import { updates } from '../application/host';

export const gamepadOptions = {
};

export const configureGamepads = (options) => {
    assign(gamepadOptions, options);

    const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

    addListener('ongamepadconnected', event => gamepads.add(event.gamepad));
    addListener('ongamepaddisconnected', event => gamepads.delete(event.gamepad));

    const updateGamepads = (deltaTime) => {
        for (const gamepad of gamepads) {
            //gamepad.buttons
            //gamepad.axes
            //publish
        }
    }

    updates.push(updateGamepads);
};

import { plugins, updates, publish, assign, addListener } from '../../../engine/main';

export const gamepadOptions = {
};

plugins.gamepad = (options) => {
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

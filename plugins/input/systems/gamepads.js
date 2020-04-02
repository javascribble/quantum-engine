import { plugins, updates, publish, addListener } from '../../../engine/main';

export const defaultGamepadOptions = {
};

plugins.gamepad = (gamepadOptions) => {
    const options = {
        ...defaultGamepadOptions,
        ...gamepadOptions
    }

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

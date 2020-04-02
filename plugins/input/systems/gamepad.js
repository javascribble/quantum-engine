import { addListener } from '../utilities/aliases';

const defaultGamepadOptions = {
};

export const createGamepadSystem = (gamepadOptions) => {
    const options = {
        ...defaultGamepadOptions,
        ...gamepadOptions
    }

    const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

    addListener('ongamepadconnected', event => gamepads.add(event.gamepad));
    addListener('ongamepaddisconnected', event => gamepads.delete(event.gamepad));

    return {
        update: (deltaTime) => {
            for (const gamepad of gamepads) {
                //gamepad.buttons
                //gamepad.axes
                //publish
            }
        }
    }
};

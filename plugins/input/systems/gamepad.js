export const enableGamepadSystem = (options, systems, updates, listeners) => {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

    listeners.set('ongamepadconnected', event => gamepads.add(event.gamepad));
    listeners.set('ongamepaddisconnected', event => gamepads.delete(event.gamepad));

    updates.add((deltaTime) => {
        for (const gamepad of gamepads) {
            //gamepad.buttons
            //gamepad.axes
            //publish
        }
    });
};

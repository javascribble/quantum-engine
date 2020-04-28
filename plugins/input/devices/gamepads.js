const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

export const initializeGamepads = (engine) => {
    listeners.set('ongamepadconnected', event => gamepads.add(event.gamepad));
    listeners.set('ongamepaddisconnected', event => gamepads.delete(event.gamepad));

    engine.executables.add({
        execute: (deltaTime) => {
            for (const gamepad of gamepads) {
                //gamepad.buttons
                //gamepad.axes
                //publish
            }
        }
    });
};
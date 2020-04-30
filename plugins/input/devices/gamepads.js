const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

export const initializeGamepads = (engine) => {
    const listeners = engine.listeners;
    listeners.set('ongamepadconnected', event => gamepads.add(event.gamepad));
    listeners.set('ongamepaddisconnected', event => gamepads.delete(event.gamepad));

    engine.updates.add({
        update: (deltaTime) => {
            for (const gamepad of gamepads) {
                //gamepad.buttons
                //gamepad.axes
                //publish
            }
        }
    });
};
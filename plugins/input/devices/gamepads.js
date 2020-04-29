const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

export const initializeGamepads = (engine) => {
    const events = engine.events;
    events.set('ongamepadconnected', event => gamepads.add(event.gamepad));
    events.set('ongamepaddisconnected', event => gamepads.delete(event.gamepad));

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
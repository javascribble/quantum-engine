export const enableGamepads = (element) => {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

    const onGamepadConnected = (event) => {
        gamepads.add(event.gamepad);
    };

    const onGamepadDisconnected = (event) => {
        gamepads.delete(event.gamepad);
    };

    element.addEventListener('ongamepadconnected', onGamepadConnected);
    element.addEventListener('ongamepaddisconnected', onGamepadDisconnected);
};
import { eventListeners } from '../application/browser';

export const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

const onGamepadConnected = (event) => {
    gamepads.add(event.gamepad);
};

const onGamepadDisconnected = (event) => {
    gamepads.delete(event.gamepad);
};

eventListeners.set('ongamepadconnected', onGamepadConnected);
eventListeners.set('ongamepaddisconnected', onGamepadDisconnected);
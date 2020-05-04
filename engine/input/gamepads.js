import { eventListeners } from '../utilities/browser.js';

export const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

const onGamepadConnected = (event) => {
    gamepads.add(event.gamepad);
};

const onGamepadDisconnected = (event) => {
    gamepads.delete(event.gamepad);
};

eventListeners.set('ongamepadconnected', onGamepadConnected);
eventListeners.set('ongamepaddisconnected', onGamepadDisconnected);
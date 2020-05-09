import { addListener } from '../aliases/browser.js';

export const gamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads();

const onGamepadConnected = (event) => {
    gamepads.add(event.gamepad);
};

const onGamepadDisconnected = (event) => {
    gamepads.delete(event.gamepad);
};

addListener('ongamepadconnected', onGamepadConnected);
addListener('ongamepaddisconnected', onGamepadDisconnected);
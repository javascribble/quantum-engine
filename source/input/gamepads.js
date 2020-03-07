import { systems } from '../application/host';
import { publish } from '../application/events';
import { insertArrayElement } from '../utilities/arrays';

export const defaultGamepadControls = {
    UP: 'PAD_UP',
    DOWN: 'PAD_DOWN',
    LEFT: 'PAD_LEFT',
    RIGHT: 'PAD_RIGHT',
    ACTION1: 'PAD_FACE_1',
    ACTION2: 'PAD_FACE_2',
    ACTION3: 'PAD_FACE_3',
    ACTION4: 'PAD_FACE_4',
    SPECIAL1: 'PAD_L_SHOULDER_1',
    SPECIAL2: 'PAD_R_SHOULDER_1',
    SPECIAL3: 'PAD_L_SHOULDER_2',
    SPECIAL4: 'PAD_R_SHOULDER_2',
    SPECIAL5: 'PAD_L_STICK_BUTTON',
    SPECIAL6: 'PAD_R_STICK_BUTTON',
    SPECIAL7: 'PAD_VENDOR',
    ANALOG1: 'PAD_L_STICK_X',
    ANALOG2: 'PAD_L_STICK_Y',
    ANALOG3: 'PAD_R_STICK_X',
    ANALOG4: 'PAD_R_STICK_Y',
    SELECT: 'PAD_SELECT',
    START: 'PAD_START'
};

const gamepads = new Set(navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads());

export function enableGamepads() {
    addEventListener('ongamepadconnected', gamepadConnected);
    addEventListener('ongamepaddisconnected', gamepadDisconnected);

    systems.push(updateGamepads);
}

function updateGamepads(deltaTime) {
    for (const gamepad of gamepads) {
        //gamepad.buttons
        //gamepad.axes
        //publish
    }
}

function gamepadConnected(event) {
    gamepads.add(event.gamepad);
}

function gamepadDisconnected(event) {
    gamepads.delete(event.gamepad);
}

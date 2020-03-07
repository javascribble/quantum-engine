import { publish } from '../application/events';

export const defaultKeyboardControls = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    ENTER: 'Enter'
};

export function enableKeyboard() {
    addEventListener('keydown', keyboardKeyDown);
    addEventListener('keyup', keyboardKeyUp);
}

function keyboardKeyDown(event) {
    publish(event.code, event);
}

function keyboardKeyUp(event) {
    publish(event.code, event);
}

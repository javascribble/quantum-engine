import { publish } from '../application/events';

addEventListener('keydown', keyboardKeyDown);
addEventListener('keyup', keyboardKeyUp);

export const defaultKeyboardControls = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    ENTER: 'Enter'
};

function keyboardKeyDown(event) {
    publish(event.code, event);
}

function keyboardKeyUp(event) {
    publish(event.code, event);
}

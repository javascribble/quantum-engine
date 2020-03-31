import { addListener } from '../application/browser';
import { publish } from '../application/events';

export const defaultKeyboardControls = {
    UP: 'ArrowUp',
    DOWN: 'ArrowDown',
    LEFT: 'ArrowLeft',
    RIGHT: 'ArrowRight',
    ENTER: 'Enter'
};

export const enableKeyboard = (options = defaultKeyboardControls) => {
    addListener('keydown', keyboardKeyDown);
    addListener('keyup', keyboardKeyUp);
};

const keyboardKeyDown = (event) => publish(event.code, event);

const keyboardKeyUp = (event) => publish(event.code, event);

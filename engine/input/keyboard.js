import { assign } from '../utilities/objects';
import { addListener } from '../application/browser';
import { publish } from '../application/events';

export const keyboardOptions = {
};

export const configureKeyboard = (options) => {
    assign(keyboardOptions, options);

    addListener('keydown', keyboardKeyDown);
    addListener('keyup', keyboardKeyUp);
};

const keyboardKeyDown = (event) => publish(event.code, event);

const keyboardKeyUp = (event) => publish(event.code, event);

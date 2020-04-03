import { updates, systems, listeners } from '../../../engine/main';

const defaultKeyboardOptions = {
};

const keyboardKeyDown = (event) => publish(event.code, event);

const keyboardKeyUp = (event) => publish(event.code, event);

export const enableKeyboardSystem = (keyboardOptions) => {
    const options = {
        ...defaultKeyboardOptions,
        ...keyboardOptions
    }

    listeners.set('keydown', keyboardKeyDown);
    listeners.set('keyup', keyboardKeyUp);
};

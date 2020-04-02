import { plugins, publish, addListener } from '../../../engine/main';

export const defaultKeyboardOptions = {
};

const keyboardKeyDown = (event) => publish(event.code, event);

const keyboardKeyUp = (event) => publish(event.code, event);

plugins.keyboard = (keyboardOptions) => {
    const options = {
        ...defaultKeyboardOptions,
        ...keyboardOptions
    }

    addListener('keydown', keyboardKeyDown);
    addListener('keyup', keyboardKeyUp);
};

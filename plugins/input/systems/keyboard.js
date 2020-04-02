import { addListener } from '../utilities/aliases';

const defaultKeyboardOptions = {
};

const keyboardKeyDown = (event) => publish(event.code, event);

const keyboardKeyUp = (event) => publish(event.code, event);

export const createKeyboardSystem = (keyboardOptions) => {
    const options = {
        ...defaultKeyboardOptions,
        ...keyboardOptions
    }

    addListener('keydown', keyboardKeyDown);
    addListener('keyup', keyboardKeyUp);

    return {};
};

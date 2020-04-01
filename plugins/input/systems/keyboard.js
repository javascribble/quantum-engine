import { plugins, publish, assign, addListener } from '../../../engine/main';

export const keyboardOptions = {
};

const keyboardKeyDown = (event) => publish(event.code, event);

const keyboardKeyUp = (event) => publish(event.code, event);

plugins.keyboard = (options) => {
    assign(keyboardOptions, options);

    addListener('keydown', keyboardKeyDown);
    addListener('keyup', keyboardKeyUp);
};

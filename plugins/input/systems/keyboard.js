const keyboardKeyDown = (event) => publish(event.code, event);

const keyboardKeyUp = (event) => publish(event.code, event);

export const enableKeyboardSystem = (options, systems, updates, listeners) => {
    listeners.set('keydown', keyboardKeyDown);
    listeners.set('keyup', keyboardKeyUp);
};

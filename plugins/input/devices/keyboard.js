export const initializeKeyboard = (engine) => {
    const keyboardKeyDown = (event) => publish(event.code, event);

    const keyboardKeyUp = (event) => publish(event.code, event);

    listeners.set('keydown', keyboardKeyDown);
    listeners.set('keyup', keyboardKeyUp);
};
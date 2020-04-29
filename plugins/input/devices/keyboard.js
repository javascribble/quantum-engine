export const initializeKeyboard = (engine) => {
    const keyboardKeyDown = (event) => publish(event.code, event);

    const keyboardKeyUp = (event) => publish(event.code, event);

    const listeners = engine.listeners;
    listeners.set('keydown', keyboardKeyDown);
    listeners.set('keyup', keyboardKeyUp);
};
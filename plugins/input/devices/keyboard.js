export const initializeKeyboard = (engine) => {
    const keyboardKeyDown = (event) => publish(event.code, event);

    const keyboardKeyUp = (event) => publish(event.code, event);

    const events = engine.events;
    events.set('keydown', keyboardKeyDown);
    events.set('keyup', keyboardKeyUp);
};
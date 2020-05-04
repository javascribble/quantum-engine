export const eventListeners = new Map();

export const addEventListeners = () => {
    for (const [event, listener] of eventListeners) {
        addEventListener(event, listener);
    }
};

export const removeEventListeners = () => {
    for (const [event, listener] of eventListeners) {
        removeEventListener(event, listener);
    }
}
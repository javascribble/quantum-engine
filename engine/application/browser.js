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

export const setElementParent = (element, parent) => {
    let currentParent = element.parentNode;
    if (currentParent) {
        currentParent.removeChild(element);
    }

    if (parent) {
        parent.appendChild(element);
    }
};
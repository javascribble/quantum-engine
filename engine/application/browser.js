export const listeners = new Map();

export const subscribeEvents = () => {
    for (const [event, handler] of listeners) {
        addEventListener(event, handler);
    }
};

export const unsubscribeEvents = () => {
    for (const [event, handler] of listeners) {
        removeEventListener(event, handler);
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
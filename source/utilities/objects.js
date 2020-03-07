export function defineObservedProperty(object, property, target, handler) {
    Object.defineProperty(object, property, {
        get: () => { return target[property]; },
        set: (value) => {
            handler(value, target[property]);
            target[property] = value;
        }
    });
}

export function defineLinkedProperty(object, property, target) {
    Object.defineProperty(object, property, {
        get: () => { return target[property]; },
        set: (value) => { target[property] = value; }
    });
}

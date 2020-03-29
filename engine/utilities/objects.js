export const defineProperty = Object.defineProperty;

export const hasEveryProperty = (object, properties) => properties.every(object.hasOwnProperty);

export const defineObservedProperty = (object, property, target, handler) => {
    defineProperty(object, property, {
        get: () => target[property],
        set: (value) => {
            handler(value, target[property]);
            target[property] = value;
        }
    });
};

export const defineLinkedProperty = (object, property, target) => {
    defineProperty(object, property, {
        get: () => target[property],
        set: (value) => target[property] = value
    });
};

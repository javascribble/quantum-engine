export const entries = Object.entries;

export const defineProperty = Object.defineProperty;

export const hasOwnProperties = (object, properties) => properties.every(property => object.hasOwnProperty(property));

export const defineObservedProperty = (object, property, target, handler) => {
    defineProperty(object, property, {
        get: () => target[property],
        set: (value) => {
            handler(value, target[property]);
            target[property] = value;
        }
    });
};
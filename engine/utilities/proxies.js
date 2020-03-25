export const captureShallowObjectChanges = (object) => {
    return new Proxy(object, {
        set(target, property, value) {
            target.changed = true;
            target[property] = value;
            return true;
        }
    });
};

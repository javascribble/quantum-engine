export function captureShallowObjectChanges(object) {
    return new Proxy(object, {
        set(target, property, value) {
            target.changed = true;
            target[property] = value;
            return true;
        }
    });
}

export function createAssignPropertyTrap(handler) {
    return {
        set(target, property, value) {
            target[property] = value;
            handler(target, property, value);
            return true;
        }
    };
}

export function createDefinePropertyTrap(handler) {
    return {
        defineProperty(target, property, descriptor) {
            Object.defineProperty(target, property, descriptor);
            handler(target, property);
            return true;
        },
    };
}

export function createDeletePropertyTrap(handler) {
    return {
        deleteProperty(target, property) {
            handler(target, property);
            delete target[property];
        }
    };
}
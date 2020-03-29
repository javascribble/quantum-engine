import { defineProperty } from './objects';

export const createAssignPropertyTrap = (handler) => {
    return {
        set(target, property, value) {
            target[property] = value;
            handler(target, property);
            return true;
        }
    };
};

export const createDefinePropertyTrap = (handler) => {
    return {
        defineProperty(target, property, descriptor) {
            defineProperty(target, property, descriptor);
            handler(target, property);
            return true;
        },
    };
};

export const createDeletePropertyTrap = (handler) => {
    return {
        deleteProperty(target, property) {
            handler(target, property);
            delete target[property];
        }
    };
};

export const captureShallowObjectChanges = (object) => {
    return new Proxy(object, {
        set(target, property, value) {
            target.changed = true;
            target[property] = value;
            return true;
        }
    });
};

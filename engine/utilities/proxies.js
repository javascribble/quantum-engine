import { defineProperty } from './objects';

export const captureShallowObjectChanges = (object) => {
    return new Proxy(object, {
        set(target, property, value) {
            target.changed = true;
            target[property] = value;
            return true;
        }
    });
};

export const createAssignPropertyTrap = (handler) => {
    return {
        set(target, property, value) {
            target[property] = value;
            handler(property, value, target);
            return true;
        }
    };
};

export const createDefinePropertyTrap = (handler) => {
    return {
        defineProperty(target, property, descriptor) {
            defineProperty(target, property, descriptor);
            handler(property, descriptor.value, target);
            return true;
        },
    };
};

export const createDeletePropertyTrap = (handler) => {
    return {
        deleteProperty(target, property) {
            handler(property, target[property], target);
            delete target[property];
        }
    };
};
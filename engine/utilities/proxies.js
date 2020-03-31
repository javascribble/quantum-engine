import { defineProperty } from './objects';

export const createAssignPropertyTrap = (handler) => ({
    set(target, property, value) {
        target[property] = value;
        handler(target, property);
        return true;
    }
});

export const createDefinePropertyTrap = (handler) => ({
    defineProperty(target, property, descriptor) {
        defineProperty(target, property, descriptor);
        handler(target, property);
        return true;
    },
});

export const createDeletePropertyTrap = (handler) => ({
    deleteProperty(target, property) {
        handler(target, property);
        delete target[property];
    }
});

export const captureShallowObjectChanges = (object) => {
    const handler = target => target.changed = true;
    return new Proxy(object, {
        ...createAssignPropertyTrap(handler),
        //...createDefinePropertyTrap(handler),
        //...createDeletePropertyTrap(handler)
    });
};

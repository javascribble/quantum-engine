import { defineProperty } from './objects';

const createAssignPropertyTrap = (handler) => ({
    set(target, property, value) {
        target[property] = value;
        handler(target, property);
        return true;
    }
});

const createDefinePropertyTrap = (handler) => ({
    defineProperty(target, property, descriptor) {
        defineProperty(target, property, descriptor);
        handler(target, property);
        return true;
    },
});

const createDeletePropertyTrap = (handler) => ({
    deleteProperty(target, property) {
        handler(target, property);
        delete target[property];
    }
});

export const createObjectObserver = (addPropertyHandler, deletePropertyHandler) => ({
    ...createAssignPropertyTrap(addPropertyHandler),
    ...createDefinePropertyTrap(addPropertyHandler),
    ...createDeletePropertyTrap(deletePropertyHandler)
});

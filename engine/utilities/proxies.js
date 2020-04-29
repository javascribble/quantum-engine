import { defineProperty } from './objects';

const createPropertyTrap = (handler) => ({
    set(target, property, value) {
        const invoke = !target.hasOwnProperty(property);
        target[property] = value;
        if (invoke) {
            handler(target, property);
        }

        return true;
    },
    defineProperty(target, property, descriptor) {
        defineProperty(target, property, descriptor);
        handler(target, property);
        return true;
    },
});

const deletePropertyTrap = (handler) => ({
    deleteProperty(target, property) {
        handler(target, property);
        delete target[property];
    }
});

export const createPropertyTraps = (createPropertyHandler, deletePropertyHandler) => ({
    ...createPropertyTrap(createPropertyHandler),
    ...deletePropertyTrap(deletePropertyHandler)
});
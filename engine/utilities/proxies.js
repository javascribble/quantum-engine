const createPropertyTrap = (handler) => ({
    set(target, property, value) {
        const invoke = !target.hasOwnProperty(property);
        target[property] = value;
        if (invoke) {
            handler(target, property, value);
        }

        return true;
    },
    defineProperty(target, property, descriptor) {
        Object.defineProperty(target, property, descriptor);
        handler(target, property, descriptor.value);
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
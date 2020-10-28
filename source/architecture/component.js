export const createComponentHandler = observers => {
    const { addComponent, replaceComponent, deleteComponent } = observers;
    return {
        set(target, property, value) {
            if (target.hasOwnProperty(property)) {
                replaceComponent(property);
            }

            target[property] = value;
            addComponent(property);
            return true;
        },
        defineProperty(target, property, descriptor) {
            Object.defineProperty(target, property, descriptor);
            addComponent(property);
            return true;
        },
        deleteProperty(target, property) {
            deleteComponent(property);
            delete target[property];
        }
    }
}; 
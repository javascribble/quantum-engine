export const createComponentHandler = observers => {
    const { addComponent, removeComponent } = observers;
    return {
        set(target, property, value) {
            target[property] = value;
            addComponent(target, property);
            return true;
        },
        defineProperty(target, property, descriptor) {
            Object.defineProperty(target, property, descriptor);
            addComponent(target, property);
            return true;
        },
        deleteProperty(target, property) {
            removeComponent(target, property);
            delete target[property];
        }
    }
};
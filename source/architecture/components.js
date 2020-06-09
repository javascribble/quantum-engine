import { defineProperty } from '../../references/quantum.js';

export const createComponentHandler = (observers) => {
    const { addComponent, deleteComponent } = observers;
    return {
        set(target, property, value) {
            target[property] = value;
            addComponent(target, property);
            return true;
        },
        defineProperty(target, property, descriptor) {
            defineProperty(target, property, descriptor);
            addComponent(target, property);
            return true;
        },
        deleteProperty(target, property) {
            delete target[property];
            deleteComponent(target, property);
        }
    }
};
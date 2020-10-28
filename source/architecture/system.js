import { createComponentHandler } from './component.js';

export const createSystemProxy = systems => {
    const { proxy, revoke } = Proxy.revocable({}, createComponentHandler({
        addComponent: component => {
            if (systems.has(component)) {
                systems.get(component).add?.(proxy)
            }
        },
        replaceComponent: component => {
            if (systems.has(component)) {
                systems.get(component).replace?.(proxy)
            }
        },
        deleteComponent: component => {
            if (systems.has(component)) {
                systems.get(component).delete?.(proxy)
            }
        }
    }));

    return { proxy, revoke };
};
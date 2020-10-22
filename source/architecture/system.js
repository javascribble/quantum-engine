import { createComponentHandler } from './component.js';

export const createSystemProxy = systems => {
    const active = new Set();
    const inactive = new Set(systems);
    const { proxy, revoke } = Proxy.revocable({}, createComponentHandler({
        addComponent: component => inactive.forEach(system => {
            if (system.component === component) {
                inactive.delete(system);
                active.add(system);
                system.add(proxy);
            }
        }),
        deleteComponent: component => active.forEach(system => {
            if (system.component === component) {
                system.delete(proxy);
                active.delete(system);
                inactive.add(system);
            }
        })
    }));

    return { active, inactive, proxy, revoke };
}; 
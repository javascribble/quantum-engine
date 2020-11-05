import { createComponentHandler } from './component.js';

export const createSystemProxy = systems => {
    const active = new Set();
    const inactive = new Set(systems);
    const { proxy, revoke } = Proxy.revocable({}, createComponentHandler({
        addComponent: (entity, component) => inactive.forEach(system => {
            if (system.validate(entity, component)) {
                inactive.delete(system);
                active.add(system);
                system.add(proxy);
            }
        }),
        replaceComponent: (entity, component) => {
            active.forEach(system => {
                system.replace(proxy);
            })
        },
        removeComponent: (entity, component) => active.forEach(system => {
            if (!system.validate(entity, component)) {
                system.remove(proxy);
                active.delete(system);
                inactive.add(system);
            }
        })
    }));

    return { active, proxy, revoke };
}; 
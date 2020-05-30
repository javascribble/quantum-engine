import { createComponentHandler } from './components.js';

export const systems = new Set();

export const createSystemProxy = () => {
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
        deleteComponent: (entity, component) => active.forEach(system => {
            if (!system.validate(entity, component)) {
                system.delete(proxy);
                active.delete(system);
                inactive.add(system);
            }
        })
    }));

    return { active, inactive, proxy, revoke };
};
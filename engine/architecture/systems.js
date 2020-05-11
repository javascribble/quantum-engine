import { createComponentHandler } from './components.js';

export const systems = new Set();

export const createSystemProxy = () => {
    const active = new Set();
    const inactive = new Set(systems);
    return { active, inactive, proxy, revoke } = Proxy.revocable({}, createComponentHandler({
        addComponent: (entity, component) => inactive.forEach(system => {
            if (system.valid(entity, component)) {
                inactive.delete(system);
                active.add(system);
                system.add(proxy);
            }
        }),
        deleteComponent: (entity, component) => active.forEach(system => {
            if (!system.valid(entity, component)) {
                system.delete(proxy);
                active.delete(system);
                inactive.add(system);
            }
        })
    }));
};
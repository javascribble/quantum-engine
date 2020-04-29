import { createPropertyTraps } from '../utilities/proxies';

export const systems = new Set();

export const createEntity = () => {
    const active = new Set();
    const inactive = new Set(systems);
    const entity = { delete: () => active.forEach(system => system.delete(entity)) };

    const componentAdded = (components) => {
        for (const system of inactive) {
            if (system.validate(components)) {
                system.add(entity);
                inactive.delete(system);
                active.add(system);
            }
        }
    };

    const componentDeleted = (components) => {
        for (const system of active) {
            if (!system.validate(components)) {
                system.delete(entity);
                active.delete(system);
                inactive.add(system);
            }
        }
    };

    entity.components = new Proxy({}, createPropertyTraps(componentAdded, componentDeleted));
    return entity;
};
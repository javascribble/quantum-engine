import { createPropertyTraps } from '../utilities/proxies';

export const systems = new Set();

export const createEntity = () => {
    const active = new Set();
    const inactive = new Set(systems);
    const entity = { components: {}, systems: { active, inactive } };

    const addComponent = (components) => {
        for (const system of inactive) {
            if (system.validate(components)) {
                system.add(entity.components);
                inactive.delete(system);
                active.add(system);
            }
        }
    };

    const deleteComponent = (components) => {
        for (const system of active) {
            if (!system.validate(components)) {
                system.delete(entity.components);
                active.delete(system);
                inactive.add(system);
            }
        }
    };

    entity.components = new Proxy(entity.components, createPropertyTraps(addComponent, deleteComponent));
    return entity;
};

export const deleteEntity = (entity) => entity.systems.active.forEach(system => system.delete(entity));

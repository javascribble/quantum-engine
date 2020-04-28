import { createPropertyTraps } from '../utilities/proxies';
import { curryDeleteSetsValue } from '../utilities/sets';
import { hasOwnProperties } from '../utilities/objects';

export const systems = new Set();

const addComponent = (entity) => {
    const { active, inactive } = entity.systems;
    for (const system of inactive) {
        if (hasOwnProperties(entity, system.components)) {
            system.add(entity.proxy);
            inactive.delete(system);
            active.add(system);
        }
    }
};

const deleteComponent = (entity) => {
    const { active, inactive } = entity.systems;
    for (const system of active) {
        if (!hasOwnProperties(entity, system.components)) {
            system.delete(entity.proxy);
            active.delete(system);
            inactive.add(system);
        }
    }
};

export const createEntity = () => {
    const entity = { systems: { active: new Set(), inactive: new Set(systems) } };
    const proxy = new Proxy(entity, createPropertyTraps(addComponent, deleteComponent));
    entity.proxy = proxy;
    return proxy;
};

export const deleteEntity = (entity) => entity.systems.active.forEach(curryDeleteSetsValue(entity));

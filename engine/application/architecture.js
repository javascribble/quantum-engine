import { createAssignPropertyTrap, createDefinePropertyTrap, createDeletePropertyTrap } from '../utilities/proxies';
import { moveSetValue, curryDelete } from '../utilities/sets';
import { hasEveryProperty } from '../utilities/objects';

const entities = new Map();
export const systems = new Set();

const addComponent = (entity) => {
    const entitySystems = entities.get(entity);
    const activeSystems = entitySystems.active;
    const inactiveSystems = entitySystems.inactive;
    for (const inactiveSystem of inactiveSystems) {
        if (hasEveryProperty(entity, inactiveSystem.components)) {
            moveSetValue(inactiveSystem, inactiveSystems, activeSystems);
            inactiveSystem.add(entity);
        }
    }
};

const deleteComponent = (entity) => {
    const entitySystems = entities.get(entity);
    const activeSystems = entitySystems.active;
    const inactiveSystems = entitySystems.inactive;
    for (const activeSystem of activeSystems) {
        if (!hasEveryProperty(entity, activeSystem.components)) {
            moveSetValue(activeSystem, activeSystems, inactiveSystems);
            activeSystem.delete(entity);
        }
    }
};

const componentObserver = {
    ...createAssignPropertyTrap(addComponent),
    ...createDefinePropertyTrap(addComponent),
    ...createDeletePropertyTrap(deleteComponent)
};

export const createEntity = (options) => {
    const entity = new Proxy(options, componentObserver);
    entities.set(entity, { active: new Set(), inactive: new Set() });
    return entity;
};

export const deleteEntity = (entity) => {
    entities.get(entity).active.forEach(curryDelete(entity));
    entities.delete(entity);
};

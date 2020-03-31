import { createAssignPropertyTrap, createDefinePropertyTrap, createDeletePropertyTrap } from '../utilities/proxies';
import { moveSetValue, curryDelete } from '../utilities/sets';
import { hasEveryProperty } from '../utilities/objects';

const entities = new Map();
export const systems = new Set();

const addComponent = (entity) => {
    const { proxy, active, inactive } = entities.get(entity);
    for (const system of inactive) {
        if (hasEveryProperty(entity, system.components)) {
            moveSetValue(system, inactive, active);
            system.add(proxy);
        }
    }
};

const deleteComponent = (entity) => {
    const { proxy, active, inactive } = entities.get(entity);
    for (const system of active) {
        if (!hasEveryProperty(entity, system.components)) {
            moveSetValue(system, active, inactive);
            system.delete(proxy);
        }
    }
};

const componentObserver = {
    ...createAssignPropertyTrap(addComponent),
    ...createDefinePropertyTrap(addComponent),
    ...createDeletePropertyTrap(deleteComponent)
};

export const createEntity = (options) => {
    const entity = { ...options };
    const proxy = new Proxy(entity, componentObserver);
    entities.set(entity, { proxy, active: new Set(), inactive: new Set(systems) });
    return proxy;
};

export const deleteEntity = (proxy) => {
    const entity = proxy.target;
    entities.get(entity).active.forEach(curryDelete(proxy));
    entities.delete(entity);
};

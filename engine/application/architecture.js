import { createObjectObserver } from '../utilities/proxies';
import { hasEveryProperty, assign } from '../utilities/objects';
import { moveSetValue, curryDelete } from '../utilities/sets';

const entities = new Map();
export const systems = new Set();

const addComponent = (entity) => {
    const proxy = entities.get(entity);
    const { active, inactive } = entity;
    for (const system of inactive) {
        if (hasEveryProperty(entity, system.components)) {
            moveSetValue(system, inactive, active);
            system.add(proxy);
        }
    }
};

const deleteComponent = (entity) => {
    const proxy = entities.get(entity);
    const { active, inactive } = entity;
    for (const system of active) {
        if (!hasEveryProperty(entity, system.components)) {
            moveSetValue(system, active, inactive);
            system.delete(proxy);
        }
    }
};

const observer = createObjectObserver(addComponent, deleteComponent);

export const createEntity = (options) => {
    const entity = {
        active: new Set(),
        inactive: new Set(systems)
    };

    const proxy = new Proxy(entity, observer);
    assign(proxy, options);
    entities.set(entity, proxy);
    return proxy;
};

export const deleteEntity = (proxy) => {
    const entity = proxy.target;
    entity.active.forEach(curryDelete(proxy));
    entities.delete(entity);
};

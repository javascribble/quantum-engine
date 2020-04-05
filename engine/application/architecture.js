import { createPropertyAssignmentHandler } from '../utilities/proxies';
import { moveSetValue, curryDelete } from '../utilities/sets';
import { hasEveryProperty } from '../utilities/objects';

export const entities = new Map();
export const systems = new Set();

// TODO: Implement graph structure for more efficient component/system pairing.
export const createEntity = (type, options) => {
    const active = new Set();
    const inactive = new Set(systems);

    const addComponent = (entity) => {
        for (const system of inactive) {
            if (hasEveryProperty(entity, system.components)) {
                moveSetValue(system, inactive, active);
                system.add(entity.proxy);
            }
        }
    };

    const deleteComponent = (entity) => {
        for (const system of active) {
            if (!hasEveryProperty(entity, system.components)) {
                moveSetValue(system, active, inactive);
                system.delete(entity.proxy);
            }
        }
    };

    const components = {};
    const entity = { delete: () => active.forEach(curryDelete(entity)) };
    const proxy = new Proxy(entity, createPropertyAssignmentHandler(addComponent, deleteComponent));
    entity.proxy = proxy;
    entities.get(type)(proxy, options);
    return proxy;
};

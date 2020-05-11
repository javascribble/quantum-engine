import { createSystemProxy } from './systems.js';

const entities = new Map();

export const createEntity = () => {
    const { active, proxy, revoke } = createSystemProxy();
    entities.set(proxy, {
        delete: () => {
            active.forEach(system => system.delete(proxy));
            revoke();
        }
    });

    return proxy;
};

export const deleteEntity = (entity) => {
    entities.get(entity).delete();
    entities.delete(entity);
};
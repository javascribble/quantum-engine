import { createSystemProxy } from './system.js';

export const createEntities = () => {
    const systems = new Map();
    const entities = new Map();
    return {
        systems,
        createEntity: () => {
            const { active, proxy, revoke } = createSystemProxy(systems);
            entities.set(proxy, {
                delete: () => {
                    active.forEach(system => system.delete(proxy));
                    revoke();
                }
            });

            return proxy;
        },
        deleteEntity: (entity) => {
            entities.get(entity).delete();
            entities.delete(entity);
        }
    };
};
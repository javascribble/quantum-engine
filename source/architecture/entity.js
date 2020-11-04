import { createSystemProxy } from './system.js';

export const createEntityInterface = systems => {
    const entities = new Map();
    return {
        createEntity: prototype => {
            const { active, proxy, revoke } = createSystemProxy(systems);
            entities.set(proxy, {
                delete: () => {
                    active.forEach(system => system.delete(proxy));
                    revoke();
                }
            });

            return prototype ? Object.assign(proxy, prototype) : proxy;
        },
        deleteEntity: proxy => {
            entities.get(proxy).delete();
            entities.delete(proxy);
        }
    };
};
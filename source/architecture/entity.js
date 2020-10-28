import { createSystemProxy } from './system.js';

export const createEntityInterface = () => {
    const systems = new Map();
    const entities = new Map();
    return {
        systems,
        createEntity: prototype => {
            const { proxy, revoke } = createSystemProxy(systems);
            entities.set(proxy, {
                delete: () => {
                    Object.getOwnPropertyNames(proxy).forEach(component => delete proxy[component]);
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
import { createSystemHandler } from './systems.js';
import { createComponentHandler } from './components.js';

const entities = new Map();

export const createEntity = () => {
    // TODO: Make this less of a nightmare without exposing anything.
    const container = {};
    const { addComponent, deleteComponent, deleteEntity } = createSystemHandler(container);
    const { proxy, revoke } = Proxy.revocable({}, createComponentHandler(addComponent, deleteComponent));
    container.proxy = proxy;
    container.revoke = revoke;
    container.deleteEntity = deleteEntity;
    entities.set(proxy, container);
    return proxy;
};

export const deleteEntity = (entity) => {
    const container = entities.get(entity);
    container.deleteEntity();
    container.revoke();
    entities.delete(entity);
};
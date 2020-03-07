import { createAssignPropertyTrap, createDefinePropertyTrap, createDeletePropertyTrap } from '../utilities/proxies';

export const componentSystems = new Map();
const componentObserver = {
    ...createAssignPropertyTrap(addComponent),
    ...createDefinePropertyTrap(addComponent),
    ...createDeletePropertyTrap(deleteComponent)
};

export function createEntity() {
    return new Proxy({}, componentObserver);
}

export function deleteEntity(entity) {
    for (const component in entity) {
        deleteComponent(entity, component);
    }
}

function addComponent(entity, component) {
    for (const system of componentSystems.get(component)) {
        system.add(entity);
    }
}

function deleteComponent(entity, component) {
    for (const system of componentSystems.get(component)) {
        system.delete(entity);
    }
}

import { createAssignPropertyTrap, createDefinePropertyTrap, createDeletePropertyTrap } from '../utilities/proxies';
import { getOrAddMapValue } from '../utilities/maps';

const componentSystems = new Map();
const componentObserver = {
    ...createAssignPropertyTrap(addEntityComponent),
    ...createDefinePropertyTrap(addEntityComponent),
    ...createDeletePropertyTrap(deleteEntityComponent)
};

export function registerComponentSystem(component, system) {
    getOrAddMapValue(componentSystems, component, () => new Set()).add(system);
}

export function createEntity() {
    return new Proxy({}, componentObserver);
}

export function deleteEntity(entity) {
    for (const component in entity) {
        deleteComponent(entity, component);
    }
}

function addEntityComponent(entity, component) {
    for (const system of componentSystems.get(component)) {
        system.add(entity);
    }
}

function deleteEntityComponent(entity, component) {
    for (const system of componentSystems.get(component)) {
        system.delete(entity);
    }
}

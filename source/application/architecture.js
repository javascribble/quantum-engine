import { systems } from './host';
import { getOrAddMapValue } from '../utilities/maps';
import { createAssignPropertyTrap, createDefinePropertyTrap, createDeletePropertyTrap } from '../utilities/proxies';

const componentSystems = new Map();
const componentObserver = {
    ...createAssignPropertyTrap(addEntityComponent),
    ...createDefinePropertyTrap(addEntityComponent),
    ...createDeletePropertyTrap(deleteEntityComponent)
};

export function registerSystem(componentName, componentSet, update) {
    getOrAddMapValue(componentSystems, componentName, () => new Set()).add(componentSet);
    update && systems.push(update);
}

export function createEntity() {
    return new Proxy({}, componentObserver);
}

export function deleteEntity(entity) {
    for (const component in entity) {
        deleteEntityComponent(entity, component);
    }
}

function addEntityComponent(entity, component) {
    for (const system of componentSystems.get(component)) {
        system.add(entity[component]);
    }
}

function deleteEntityComponent(entity, component) {
    for (const system of componentSystems.get(component)) {
        system.delete(entity[component]);
    }
}

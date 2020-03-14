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

export function createEntity(object = {}) {
    return new Proxy(object, componentObserver);
}

export function deleteEntity(entity) {
    for (const component in entity) {
        deleteEntityComponent(entity, component);
    }
}

function addEntityComponent(entity, component) {
    if(componentSystems.has(component)) {
        componentSystems.get(component).forEach(system => system.add(entity[component]));
    }
}

function deleteEntityComponent(entity, component) {
    if (componentSystems.has(component)) {
        componentSystems.get(component).forEach(system => system.delete(entity[component]));
    }
}

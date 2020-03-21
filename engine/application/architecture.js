import { systems } from './host';
import { getOrAddMapValue } from '../utilities/maps';
import { createAssignPropertyTrap, createDefinePropertyTrap, createDeletePropertyTrap } from '../utilities/proxies';

const componentSystems = new Map();

const addEntityComponent = (entity, component) => {
    if (componentSystems.has(component)) {
        componentSystems.get(component).forEach(system => system.add(entity[component]));
    }
}

const deleteEntityComponent = (entity, component) => {
    if (componentSystems.has(component)) {
        componentSystems.get(component).forEach(system => system.delete(entity[component]));
    }
}

const componentObserver = {
    ...createAssignPropertyTrap(addEntityComponent),
    ...createDefinePropertyTrap(addEntityComponent),
    ...createDeletePropertyTrap(deleteEntityComponent)
};

export const registerSystem = (componentName, componentSet, update) => {
    getOrAddMapValue(componentSystems, componentName, () => new Set()).add(componentSet);
    update && systems.push(update);
}

export const createEntity = (object = {}) => new Proxy(object, componentObserver);

export const deleteEntity = (entity) => {
    for (const component in entity) {
        deleteEntityComponent(entity, component);
    }
}

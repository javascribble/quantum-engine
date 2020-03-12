import { systems } from './host';
import { getOrAddMapValue } from '../utilities/maps';
import { createAssignPropertyTrap, createDefinePropertyTrap, createDeletePropertyTrap } from '../utilities/proxies';

const componentSystems = new Map();
const componentObserver = {
    ...createAssignPropertyTrap(addEntityComponent),
    ...createDefinePropertyTrap(addEntityComponent),
    ...createDeletePropertyTrap(deleteEntityComponent)
};

export function registerComponentSystemUpdate(component, system, update) {
    registerComponentSystem(component, system);
    systems.push(update);
}

export function registerComponentSystem(component, system) {
    getOrAddMapValue(componentSystems, component, () => new Set()).add(system);
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
        system.add(entity);
    }
}

function deleteEntityComponent(entity, component) {
    for (const system of componentSystems.get(component)) {
        system.delete(entity);
    }
}

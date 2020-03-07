import { createAssignPropertyTrap, createDefinePropertyTrap, createDeletePropertyTrap } from '../utilities/proxies';

const systemComponents = new Map();
const entitySystems = new Map();
const componentObserver = {
    ...createAssignPropertyTrap(addComponent),
    ...createDefinePropertyTrap(addComponent),
    ...createDeletePropertyTrap(deleteComponent)
};

export function registerSystem(system, components) {
    systemComponents.set(system, components);
}

export function createEntity() {
    let entity = new Proxy({}, componentObserver);
    entitySystems.set(entity, new Set());
    return entity;
}

export function deleteEntity(entity) {
    for (const system of entitySystems.get(entity)) {
        system.delete(entity);
    }

    entitySystems.delete(entity);
}

function addComponent(entity, component) {
    for (const [system, components] of systemComponents) {
        // Entity components intersect.
    }
}

function deleteComponent(entity, component) {
    let systems = entitySystems.get(entity);
    for (const system of systems) {
        let components = systemComponents.get(system);
        if (components.contains(component)) {
            system.delete(entity);
            systems.delete(system);
        }
    }
}

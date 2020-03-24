import { createAssignPropertyTrap, createDefinePropertyTrap, createDeletePropertyTrap } from '../utilities/proxies';
import { getOrAddMapValue, tryExecuteMapValue } from '../utilities/maps';
import { processObjectEntries } from '../utilities/objects';
import { curryAdd, curryDelete } from '../utilities/sets';
import { systems } from './host';

const componentSystems = new Map();

const addComponent = (name, value) => {
    if (componentSystems.has(name)) {
        componentSystems.get(name).forEach(curryAdd(value));
    }
};

const deleteComponent = (name, value) => {
    if (componentSystems.has(name)) {
        componentSystems.get(name).forEach(curryDelete(value));
    }
};

const componentObserver = {
    ...createAssignPropertyTrap(addComponent),
    ...createDefinePropertyTrap(addComponent),
    ...createDeletePropertyTrap(deleteComponent)
};

export const registerSystem = (componentName, componentSet, update) => {
    getOrAddMapValue(componentSystems, componentName, () => new Set()).add(componentSet);
    update && systems.push(update);
};

export const createEntity = (object = {}) => new Proxy(object, componentObserver);

export const deleteEntity = (entity) => processObjectEntries(entity, deleteComponent);

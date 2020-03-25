import { curryDelete } from '../utilities/sets';
import { updates } from './host';

const entities = new Map();
const systems = new Map();

export const addEntity = (entity = {}) => {
    entities.set(entity, new Set());
    return entity;
}

export const deleteEntity = (entity) => {
    entities.get(entity).forEach(curryDelete(entity));
    entities.delete(entity);
};

export const addComponent = (component, entity) => {
    const system = systems.get(component);
    entities.get(entity).add(system);
    system.add(entity);
};

export const deleteComponent = (component, entity) => {
    const system = systems.get(component);
    entities.get(entity).delete(system);
    system.delete(entity);
};

export const registerSystem = (component, system, update) => {
    systems.set(component, system);
    update && updates.push(update);
};
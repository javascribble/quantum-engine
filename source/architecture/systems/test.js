import { systems } from '../../application/host'
import { registerComponentSystem } from '../ecs';

const entities = new Set();

export function registerTestSystem() {
    registerComponentSystem('node', entities);
    systems.push(updateTestSystem);
}

function updateTestSystem(deltaTime) {
    if (entities.size > 0) {
        console.log(entities.size);
        entities.clear();
    }
}

import { registerTestSystem } from './systems/test';
import { createEntity } from './ecs';

export function registerSystems() {
    registerTestSystem();
    let entity = createEntity();
    entity.node = "test";
}
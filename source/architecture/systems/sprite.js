import { systems } from '../../application/host'
import { registerComponentSystem } from '../ecs';

const entities = new Set();

// TODO: Pull configured keybindings.

export function registerInputSystem() {
    registerComponentSystem('sprite', entities);
    systems.push(updateInputSystem);
}

function updateInputSystem(deltaTime) {
}

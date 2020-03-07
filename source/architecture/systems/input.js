import { systems } from '../../application/host'
import { registerComponentSystem } from '../ecs';

const entities = new Set();

// TODO: Pull configured keybindings.

export function registerTestSystem() {
    registerComponentSystem('input', entities);
    systems.push(updateInputSystem);
}

function updateInputSystem(deltaTime) {
}

// TODO: Update dirty properties in a system periodically.
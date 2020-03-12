import { registerComponentSystemUpdate } from '../application/architecture';

export function registerInputSystem() {
    // TODO: Pull configured keybindings.
    const entities = new Set();

    function updateInputSystem(deltaTime) {
    }

    registerComponentSystemUpdate('input', entities, updateInputSystem);
}

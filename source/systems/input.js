import { registerSystem } from '../application/architecture';
import { inputComponent } from '../components/input';

export function registerInputSystem() {
    // TODO: Pull configured keybindings.
    const inputs = new Set();
    function updateInputSystem(deltaTime) {
    }

    registerSystem(inputComponent, inputs, updateInputSystem);
}

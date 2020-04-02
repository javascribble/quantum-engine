import { plugins, updates, systems } from '../../engine/main';
import { createGamepadSystem } from './systems/gamepad';
import { createKeyboardSystem } from './systems/keyboard';
import { createMouseSystem } from './systems/mouse';
import { createTouchSystem } from './systems/touch';

const defaultInputOptions = {
};

plugins.input = (inputOptions) => {
    const options = {
        ...defaultInputOptions,
        ...inputOptions
    };

    const gamepadSystem = createGamepadSystem(options);
    const keyboardSystem = createKeyboardSystem(options);
    const mouseSystem = createMouseSystem(options);
    const touchSystem = createTouchSystem(options);

    updates.push(gamepadSystem.update);
};
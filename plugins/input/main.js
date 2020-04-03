//export * from './components';
//export * from './entities';

import { enableGamepadSystem } from './systems/gamepad';
import { enableKeyboardSystem } from './systems/keyboard';
import { enableMouseSystem } from './systems/mouse';
import { enableTouchSystem } from './systems/touch';
import { plugins } from '../../engine/main';

const defaultInputOptions = {
};

plugins.input = (inputOptions) => {
    const options = {
        ...defaultInputOptions,
        ...inputOptions
    };

    enableGamepadSystem(options);
    enableKeyboardSystem(options);
    enableMouseSystem(options);
    enableTouchSystem(options);
};
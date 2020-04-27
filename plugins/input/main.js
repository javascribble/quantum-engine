import { plugins, systems, updates } from '../../engine/main';
import { enableGamepadSystem } from './systems/gamepad';
import { enableKeyboardSystem } from './systems/keyboard';
import { enableMouseSystem } from './systems/mouse';
import { enableTouchSystem } from './systems/touch';

plugins.set('input', {
    start: (options) => {
        enableGamepadSystem(options, systems, updates);
        enableKeyboardSystem(options, systems, updates);
        enableMouseSystem(options, systems, updates);
        enableTouchSystem(options, systems, updates);
    },
    stop: () => { }
});
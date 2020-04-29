import { initializeGamepads } from '../devices/gamepads';
import { initializeKeyboard } from '../devices/keyboard';
import { initializeMouse } from '../devices/mouse';
import { initializeTouch } from '../devices/touch';

export default (engine) => {
    initializeGamepads(engine);
    initializeKeyboard(engine);
    initializeMouse(engine);
    initializeTouch(engine);
};

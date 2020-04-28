import * as engine from '../../engine/main';
import { initializeGamepads } from './devices/gamepads';
import { initializeKeyboard } from './devices/keyboard';
import { initializeMouse } from './devices/mouse';
import { initializeTouch } from './devices/touch';

initializeGamepads(engine);
initializeKeyboard(engine);
initializeMouse(engine);
initializeTouch(engine);

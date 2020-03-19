import { enableGamepads } from '../input/gamepads';
import { enableKeyboard } from '../input/keyboard';
import { enableMouse } from '../input/mouse';
import { enableTouch } from '../input/touch';
import { enableNetwork } from '../network/socket';
import { enableOfflineSupport } from '../network/worker';

export const enableEngineDefaults = () => {
    enableGamepads();
    enableKeyboard();
    enableMouse();
    enableTouch();
    enableNetwork();
    enableOfflineSupport();
}

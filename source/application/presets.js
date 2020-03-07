import { enableGamepads } from '../input/gamepads';
import { enableKeyboard } from '../input/gamepads';
import { enableMouse } from '../input/mouse';
import { enableTouch } from '../input/touch';
import { enableNetwork } from '../network/socket';
import { enableOfflineSupport } from '../network/worker';

export function initialize2dPreset() {
    enableGamepads();
    enableKeyboard();
    enableMouse();
    enableTouch();
    enableNetwork();
    enableOfflineSupport();
}

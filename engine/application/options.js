import { entries } from '../utilities/objects';
import { configureGamepads } from '../input/gamepads';
import { configureKeyboard } from '../input/keyboard';
import { configureMouse } from '../input/mouse';
import { configureTouch } from '../input/touch';
import { configureLoader } from '../network/loader';
import { configureSocket } from '../network/socket';
import { configureWorker } from '../network/worker';
import { configurePlugins } from './plugins';

const configurators = {
    gamepad: configureGamepads,
    keyboard: configureKeyboard,
    mouse: configureMouse,
    touch: configureTouch,
    loader: configureLoader,
    network: configureSocket,
    workers: configureWorker,
    plugins: configurePlugins
}

export const configure = (options) => {
    for (const [option, configuration] of entries(options)) {
        configurators[option](configuration);
    }
};

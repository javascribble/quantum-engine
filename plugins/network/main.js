//export * from './components';
//export * from './entities';

import { enableSocketSystem } from './systems/socket';
import { enableWorkerSystem } from './systems/worker';
import { plugins } from '../../engine/main';

plugins.network = (options) => {
    enableSocketSystem(options);
    enableWorkerSystem(options);
};

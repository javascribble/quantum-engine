import { plugins, systems, updates } from '../../engine/main';
import { enableSocketSystem } from './systems/socket';
import { enableWorkerSystem } from './systems/worker';

plugins.set('network', {
    start: (options) => {
        enableSocketSystem(options, systems, updates);
        enableWorkerSystem(options, systems, updates);
    },
    stop: () => { }
});
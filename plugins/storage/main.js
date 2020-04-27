import { plugins, systems, updates } from '../../engine/main';
import { enableLocalStorageSystem } from './systems/localStorage';

plugins.set('storage', {
    start: (options) => {
        enableLocalStorageSystem(options, systems, updates);
    },
    stop: () => { }
});
import { plugins, systems, updates } from '../../engine/main';
import { enableRendererSystem } from './systems/renderer';

plugins.set('video', {
    start: (options) => {
        enableRendererSystem(options, systems, updates);
    },
    stop: () => { }
});
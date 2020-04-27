import { plugins, systems, updates } from '../../engine/main';
import { enableTransformSystem } from './systems/transform';
import { enableGraphSystem } from './systems/graph';

plugins.set('graphics', {
    start: (options) => {
        enableTransformSystem(options, systems, updates);
        enableGraphSystem(options, systems, updates);
    },
    stop: () => { }
});
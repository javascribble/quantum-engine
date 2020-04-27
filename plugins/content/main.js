import { plugins, systems, updates } from '../../engine/main';
import { enableResourcesSystem } from './systems/resources';
import { enableSceneSystem } from './systems/scene';

plugins.set('content', {
    start: (options) => {
        enableResourcesSystem(options, systems, updates);
        enableSceneSystem(options, systems, updates);
    },
    stop: () => { }
});

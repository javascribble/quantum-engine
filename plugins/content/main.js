//export * from './components';
//export * from './entities';

import { enableResourcesSystem } from './systems/resources';
import { enableSceneSystem } from './systems/scene';
import { plugins } from '../../engine/main';

plugins.content = (options) => {
    enableResourcesSystem(options);
    enableSceneSystem(options);
};
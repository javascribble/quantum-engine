//export * from './components';
//export * from './entities';

import { enableTransformSystem } from './systems/transform';
import { enableGraphSystem } from './systems/graph';
import { plugins } from '../../engine/main';

plugins.graphics = (options) => {
    enableTransformSystem(options);
    enableGraphSystem(options);
};
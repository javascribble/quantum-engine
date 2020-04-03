//export * from './components';
//export * from './entities';

import { enableRendererSystem } from './systems/renderer';
import { plugins } from '../../engine/main';

plugins.audio = (options) => {
    enableRendererSystem(options);
};
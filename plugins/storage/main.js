import { enableLocalStorageSystem } from './systems/localStorage';
import { plugins } from '../../engine/main';

plugins.storage = (options) => {
    enableLocalStorageSystem(options);
};

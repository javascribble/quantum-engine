import * as engine from '../../engine/main';
import { initializeFormats } from './loading/formats';
import { initializeResources } from './loading/resources';

initializeFormats(engine);
initializeResources(engine);
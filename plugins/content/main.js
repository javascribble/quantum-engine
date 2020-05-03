import * as engine from '../../engine/main';
import adaptContent from './adapters/formats';
import adaptResources from './adapters/resources';
import adaptScenes from './adapters/scenes';

adaptContent(engine);
adaptResources(engine);
adaptScenes(engine);
import { initializeFormats } from '../loaders/formats';
import { initializeResources } from '../lifecycle/resources';
import { initializeScenes } from '../lifecycle/scenes';

export default (engine) => {
    initializeFormats(engine);
    initializeResources(engine);
    initializeScenes(engine);
};
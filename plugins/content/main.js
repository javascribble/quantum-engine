import { plugins, updates, systems } from '../../engine/main';
import { createResourcesSystem } from './systems/resources';

const defaultContentOptions = {
};

plugins.content = async (contentOptions) => {
    const options = {
        ...defaultContentOptions,
        ...contentOptions
    };

    const resourcesSystem = createResourcesSystem(options);
};
import { plugins, updates, systems } from '../../engine/main';
import { createTransformSystem } from './systems/transform';

const defaultGraphicsOptions = {
};

plugins.graphics = (graphicsOptions) => {
    const options = {
        ...defaultGraphicsOptions,
        graphicsOptions
    };

    const transformSystem = createTransformSystem(options);

    updates.push(transformSystem.update);

    systems.add(transformSystem);
};
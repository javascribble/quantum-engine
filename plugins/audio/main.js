import { plugins, updates, systems } from '../../engine/main';
import { createRendererSystem } from './systems/renderer';

export const defaultAudioOptions = {
};

plugins.audio = async (audioOptions) => {
    const options = {
        ...defaultAudioOptions,
        ...audioOptions
    };

    const rendererSystem = createRendererSystem(options);
};

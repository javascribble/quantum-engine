import { plugins, updates, systems } from '../../../engine/main';

export const defaultAudioOptions = {
};

plugins.audio = async (audioOptions) => {
    const options = {
        ...defaultAudioOptions,
        ...audioOptions
    }
};

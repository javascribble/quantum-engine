import { plugins, updates, systems, assign } from '../imports';

export const audioOptions = {
};

export const registerAudio = async (options) => {
    assign(audioOptions, options);
};

plugins.audio = registerAudio;
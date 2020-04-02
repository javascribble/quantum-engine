import { plugins, updates, systems } from '../../../engine/main';

export const defaultSceneOptions = {
};

plugins.scene = async (sceneOptions) => {
    const options = {
        ...defaultSceneOptions,
        ...sceneOptions
    };
};

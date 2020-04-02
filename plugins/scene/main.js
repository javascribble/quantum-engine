import { plugins, updates, systems } from '../../engine/main';

const defaultSceneOptions = {
};

plugins.scene = async (sceneOptions) => {
    const options = {
        ...defaultSceneOptions,
        ...sceneOptions
    };
};
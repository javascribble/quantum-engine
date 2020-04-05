import { systems } from '../../../engine/main';

const defaultSceneOptions = {
};

export const enableSceneSystem = async (sceneOptions) => {
    const options = {
        ...defaultSceneOptions,
        ...sceneOptions
    };

    const scenes = options.scenes;

    createScene()
    systems.add({
        components: ['entities'],
        add: (entity) => {
            // TODO: Instiantiate entity.scene.entities
        },
        delete: (entity) => {
            // TODO: Delete entity.scene.entities
        }
    });
};
export const enableSceneSystem = async (options, systems, updates, listeners) => {
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
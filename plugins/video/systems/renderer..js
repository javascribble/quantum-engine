export const enableRendererSystem = async (options, systems, updates) => {
    systems.add({
        components: ['renderable'],
        add: (entity) => {
        },
        delete: (entity) => {
        }
    });
};
const defaultRendererOptions = {
};

export const createRendererSystem = async (rendererOptions) => {
    const options = {
        ...defaultRendererOptions,
        ...rendererOptions
    };

    return {
        components: [],
        add: (entity) => {
        },
        delete: (entity) => {
        },
        update: (deltaTime) => {
        }
    }
}; 
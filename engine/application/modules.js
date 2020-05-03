export const modules = new Set();

export const startModules = async (options) => {
    for (const module of modules) {
        await module.start(options);
    }
};

export const stopModules = async () => {
    for (const module of modules.reverse()) {
        await module.stop();
    }
};
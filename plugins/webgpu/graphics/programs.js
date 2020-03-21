export const defaultProgramOptions = {
    primitiveTopology: 'triangle-strip'
};

export const createProgram = (options) => ({
    ...defaultProgramOptions,
    ...options
});

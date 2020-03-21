export const defaultPipelineLayoutOptions = {
    bindGroupLayouts: []
};

export const createPipelineLayout = (device, options) => device.createPipelineLayout({
    ...defaultPipelineLayoutOptions,
    ...options
})
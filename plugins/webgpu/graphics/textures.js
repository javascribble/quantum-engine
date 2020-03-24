import { sampledTextureUsage, copyDestinationTextureUsage } from './constants';

export const defaultTextureOptions = {
    format: 'rgba8unorm'
};

export const createSampledTexture = (device, size, format) => createTexture(device, size, format, sampledTextureUsage | copyDestinationTextureUsage);

export const createTexture = (device, size, format, usage) => device.createTexture({ size, usage, format });

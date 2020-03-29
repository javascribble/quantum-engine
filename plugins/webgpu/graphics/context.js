import { outputAttachmentTextureUsage, copySourceTextureUsage } from './constants';

export const defaultSwapChainOptions = {
    usage: outputAttachmentTextureUsage | copySourceTextureUsage
};

export const createSwapChain = (context, device, options) => {
    const format = await context.getSwapChainPreferredFormat(device);
    return context.configureSwapChain({ device, format, ...defaultSwapChainOptions, ...options });
};
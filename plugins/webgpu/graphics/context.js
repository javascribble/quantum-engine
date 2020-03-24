import { outputAttachmentTextureUsage, copySourceTextureUsage } from './constants';

export const defaultSwapChainOptions = {
    usage: outputAttachmentTextureUsage | copySourceTextureUsage
};

export const createPreferredSwapChain = async (context, device, options) => createSwapChain(context, device, { ...options, format: await context.getSwapChainPreferredFormat(device) });

export const createSwapChain = (context, device, options) => context.configureSwapChain({ device, ...defaultSwapChainOptions, ...options });
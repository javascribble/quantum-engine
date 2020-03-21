import { outputAttachmentTextureUsage, copySourceTextureUsage } from './textures';

const defaultSwapChainOptions = {
    usage: outputAttachmentTextureUsage | copySourceTextureUsage
};

export const configureSwapChain = (context, options) => context.configureSwapChain({
    ...defaultSwapChainOptions,
    ...options
});

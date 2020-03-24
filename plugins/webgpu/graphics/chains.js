import { outputAttachmentTextureUsage, copySourceTextureUsage } from './constants';

const defaultSwapChainOptions = {
    usage: outputAttachmentTextureUsage | copySourceTextureUsage
};

export const configureSwapChain = (context, options) => context.configureSwapChain({
    ...defaultSwapChainOptions,
    ...options
});

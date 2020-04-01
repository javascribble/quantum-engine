import { getWebGPUContext } from '../../../engine/main';
import { outputAttachmentTextureUsage, copySourceTextureUsage } from './constants';

export const createSwapChain = async (device, canvas) => {
    const context = getWebGPUContext(canvas);
    const format = await context.getSwapChainPreferredFormat(device);
    const usage = outputAttachmentTextureUsage | copySourceTextureUsage;
    return context.configureSwapChain({ device, format, usage });
};

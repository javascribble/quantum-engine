import { defaultVideoOptions } from '../imports';
import { createWebGPUContext } from '../renderer/context';

export async function registerVideoRenderingSystem(options = defaultVideoOptions) {
    await createWebGPUContext(options);
}
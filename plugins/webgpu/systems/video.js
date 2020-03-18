import { defaultVideoOptions } from '../imports';
import { createWebGPUContext } from '../renderer/context';

export async function registerVideoSystem(options = defaultVideoOptions) {
    await createWebGPUContext(options);
}
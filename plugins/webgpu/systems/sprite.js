import { defaultVideoOptions } from '../imports';
import { createWebGPUContext } from '../renderer/context';

export async function registerWebGPUSystem(options = defaultVideoOptions) {
    await createWebGPUContext(options);
}
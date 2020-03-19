import { createWebGPUContext } from './context';

export async function createManagedWebGPUContext(options) {
    const context = createWebGPUContext(options);
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
    context.device = device;
    return context;
}

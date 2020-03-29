import { getWebGPUContext } from '../imports';
import { encodeCommand } from '../graphics/commands';
import { updateStrategy } from '../graphics/strategy';
import { renderableComponent } from '../components/renderable';

export const createRendererSystem = async (options) => {
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();

    const targets = {};
    for (const canvas of options.canvases) {
        const context = getWebGPUContext(canvas);
        const swapChain = await createSwapChain(context, device);
        targets[canvas.name] = { canvas, swapChain };
    }

    const adds = new Set();
    const deletes = new Set();
    const commands = new Map();
    return {
        components: [renderableComponent],
        add(entity) {
            adds.add(entity.renderable);
        },
        delete(entity) {
            deletes.add(entity.renderable);
        },
        update(deltaTime) {
            updateStrategy(commands, targets, adds, deletes);

            const encodedCommands = [];
            for (const command of commands.values()) {
                encodedCommands.push(encodeCommand(device, command));
            }

            // TODO: Support multiple queues.
            device.defaultQueue.submit(encodedCommands);
        }
    }
}; 
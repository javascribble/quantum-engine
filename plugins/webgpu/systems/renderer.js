import { createSwapChain } from '../graphics/context';
import { encodeCommand } from '../graphics/commands';
import { updateStrategy } from '../graphics/strategy';
import { renderableComponent } from '../components/renderable';

export const createRendererSystem = async (options) => {
    const adds = new Set();
    const deletes = new Set();
    const commands = new Map();
    const targets = new Map();

    const device = options.device;
    for (const canvas of options.canvases) {
        const swapChain = await createSwapChain(device, canvas);
        targets.set(canvas.name, { canvas, swapChain });
    }

    return {
        components: [renderableComponent],
        add(entity) {
            adds.add(entity.renderable);
        },
        delete(entity) {
            deletes.add(entity.renderable);
        },
        update(deltaTime) {
            for (const target of targets.values()) {
                target.texture = target.swapChain.getCurrentTexture().createView();
            }

            if (adds.size > 0 || deletes.size > 0) {
                updateStrategy(commands, targets, adds, deletes);
                adds.clear();
                deletes.clear();
            }

            const encodedCommands = [];
            for (const command of commands.values()) {
                encodedCommands.push(encodeCommand(device, command));
            }

            // TODO: Support multiple queues.
            device.defaultQueue.submit(encodedCommands);
        }
    }
}; 
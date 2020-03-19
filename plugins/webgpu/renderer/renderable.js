import { loadResource } from '../imports';
import { createBuffer } from '../handles/buffers';
import { createProgram } from '../handles/programs';
import { resizeCanvas } from '../../canvas/exports';

export async function createWebGPURenderable(context) {
    const device = context.device;
    const canvas = context.canvas;

    const renderPassDescriptor = await loadResource('webgpuRenderPass.json');
    
    return {
        add(renderable) {
            resizeCanvas(canvas);

            const resources = renderable.resources;
            const buffers = resources.buffers.staticBuffer;
            const positionBuffer = createBuffer(device, new Float32Array(buffers.positions), GPUBufferUsage.VERTEX);
            const colorBuffer = createBuffer(device, new Float32Array(buffers.colors), GPUBufferUsage.VERTEX);
            const indexBuffer = createBuffer(device, new Uint16Array(buffers.indices), GPUBufferUsage.INDEX);
            const program = createProgram(device, resources.programs.defaultProgram);
            const pipeline = device.createRenderPipeline(program);

            const depthTextureDescriptor = resources.textures.depthTexture;
            depthTextureDescriptor.size = {
                width: canvas.width,
                height: canvas.height,
                depth: 1
            };

            const swapChainDescriptor = {
                device: device,
                format: 'bgra8unorm',
                usage: GPUTextureUsage.OUTPUT_ATTACHMENT | GPUTextureUsage.COPY_SRC
            };

            const swapChain = context.configureSwapChain(swapChainDescriptor);
            renderPassDescriptor.depthStencilAttachment.attachment = device.createTexture(depthTextureDescriptor).createView();
            renderPassDescriptor.colorAttachments[0].attachment = swapChain.getCurrentTexture().createView();

            const commandEncoder = device.createCommandEncoder();
            const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
            passEncoder.setPipeline(pipeline);
            passEncoder.setViewport(0, 0, canvas.width, canvas.height, 0, 1);
            passEncoder.setScissorRect(0, 0, canvas.width, canvas.height);
            passEncoder.setVertexBuffer(0, positionBuffer);
            passEncoder.setVertexBuffer(1, colorBuffer);
            passEncoder.setIndexBuffer(indexBuffer);
            passEncoder.drawIndexed(4, 1, 0, 0, 0);
            passEncoder.endPass();
            device.defaultQueue.submit([commandEncoder.finish()]);
        },
        delete(resources) {
        }
    };
}
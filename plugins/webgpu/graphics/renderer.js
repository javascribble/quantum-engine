import { loadResource, resizeCanvas } from '../imports';
import { createBuffer, vertexBufferUsage, indexBufferUsage, copyDestinationBufferUsage } from './buffers';
import { createShader } from './shaders';
import { createShaderModule } from './modules';
import { createProgram } from './programs';
import { createPipelineLayout } from './layouts';
import { configureSwapChain } from './chains';

export const createRenderer = async (device, canvas, context, options) => {
    const swapChain = await configureSwapChain(context, { device, format: await context.getSwapChainPreferredFormat(device) });
    
    const renderPassDescriptor = await loadResource('webgpuRenderPass.json');

    const renderables = {
        add(scene) {
            const resources = scene.resources;
            const buffers = resources.buffers.staticBuffer;

            const programOptions = {
                layout: createPipelineLayout(device),
                vertexStage: createShader({ module: createShaderModule(device, { code: resources.shaders.defaultVertexShader }) }),
                fragmentStage: createShader({ module: createShaderModule(device, { code: resources.shaders.defaultFragmentShader }) }),
                ...resources.programs.defaultProgram
            };                

            const program = createProgram(programOptions);
            const pipeline = device.createRenderPipeline(program);

            const depthTextureDescriptor = resources.textures.depthTexture;
            depthTextureDescriptor.size = {
                width: canvas.width,
                height: canvas.height,
                depth: 1
            };

            renderPassDescriptor.depthStencilAttachment.attachment = device.createTexture(depthTextureDescriptor).createView();
            renderPassDescriptor.colorAttachments[0].attachment = swapChain.getCurrentTexture().createView();

            const positionBuffer = createBuffer(device, new Float32Array(buffers.positions), vertexBufferUsage | copyDestinationBufferUsage);
            const colorBuffer = createBuffer(device, new Float32Array(buffers.colors), vertexBufferUsage | copyDestinationBufferUsage);
            const indexBuffer = createBuffer(device, new Uint16Array(buffers.indices), indexBufferUsage | copyDestinationBufferUsage);

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
        delete(scene) {
        }
    };

    return { 
        renderables,
        render(deltaTime) {
            resizeCanvas(canvas, options.scale);
        }
    }
}
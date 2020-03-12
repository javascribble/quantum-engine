import { createWebGPUContext } from '../canvas';
import { loadArrayBuffer } from '../../network/loader';
import { loadResource, resourceOptions } from '../../network/resources';

resourceOptions.extensions['spv'] = async resource => new Uint32Array(await loadArrayBuffer(resource));

export async function createRenderer() {
    const adapter = await navigator.gpu.requestAdapter();
    const device = await adapter.requestDevice();
    const context = createWebGPUContext();
    const canvas = context.canvas;
    document.body.appendChild(canvas);

    const swapChainDescriptor = {
        device: device,
        format: 'bgra8unorm',
        usage: GPUTextureUsage.OUTPUT_ATTACHMENT | GPUTextureUsage.COPY_SRC
    };

    const swapChain = context.configureSwapChain(swapChainDescriptor);

    const buffers = await loadResource('webgpuStaticBuffers.json');
    const positionBuffer = createBuffer(device, new Float32Array(buffers.positions), GPUBufferUsage.VERTEX);
    const colorBuffer = createBuffer(device, new Float32Array(buffers.colors), GPUBufferUsage.VERTEX);
    const indexBuffer = createBuffer(device, new Uint16Array(buffers.indices), GPUBufferUsage.INDEX);

    const program = await loadResource('webgpuProgram.json');
    program.layout = device.createPipelineLayout({ bindGroupLayouts: [] });
    program.vertexStage.module = device.createShaderModule({ code: await loadResource(program.vertexStage.module) });
    program.fragmentStage.module = device.createShaderModule({ code: await loadResource(program.fragmentStage.module) });
    const pipeline = device.createRenderPipeline(program);

    const renderPass = await loadResource('webgpuRenderPass.json');

    const depthSize = {
        width: canvas.width,
        height: canvas.height,
        depth: 1
    };

    const depthTextureDescriptor = {
        size: depthSize,
        arrayLayerCount: 1,
        mipLevelCount: 1,
        sampleCount: 1,
        dimension: '2d',
        format: 'depth24plus-stencil8',
        usage: GPUTextureUsage.OUTPUT_ATTACHMENT | GPUTextureUsage.COPY_SRC
    };

    const depthTexture = device.createTexture(depthTextureDescriptor);
    const depthTextureView = depthTexture.createView();
    const depthStencilAttachment = {
        attachment: depthTextureView,
        depthLoadValue: 1,
        depthStoreOp: 'store',
        stencilLoadValue: 'load',
        stencilStoreOp: 'store'
    };

    const colorTexture = swapChain.getCurrentTexture();
    const colorTextureView = colorTexture.createView();
    const colorAttachments = [{
        attachment: colorTextureView,
        loadValue: { r: 0, g: 0, b: 0, a: 1 },
        storeOp: 'store'
    }];

    const renderPassDescriptor = {
        depthStencilAttachment,
        colorAttachments
    };

    let commandEncoder = device.createCommandEncoder();
    let passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.setViewport(0, 0, canvas.width, canvas.height, 0, 1);
    passEncoder.setScissorRect(0, 0, canvas.width, canvas.height);
    passEncoder.setVertexBuffer(0, positionBuffer);
    passEncoder.setVertexBuffer(1, colorBuffer);
    passEncoder.setIndexBuffer(indexBuffer);
    passEncoder.drawIndexed(4, 1, 0, 0, 0);
    passEncoder.endPass();
    device.defaultQueue.submit([commandEncoder.finish()]);
}

export function renderScenes(renderer, deltaTime) {

}

function createBuffer(device, array, usage) {
    let [buffer, bufferMapped] = device.createBufferMapped({ size: array.byteLength, usage });
    let typedArray = array instanceof Uint16Array ? new Uint16Array(bufferMapped) : new Float32Array(bufferMapped)
    typedArray.set(array);
    buffer.unmap();
    return buffer;
}

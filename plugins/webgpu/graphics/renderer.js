import { loadResource, resizeCanvas, matrix3, matrix4 } from '../imports';
import { createBuffer, vertexBufferUsage, indexBufferUsage, copyDestinationBufferUsage } from './buffers';
import { createShader } from './shaders';
import { createShaderModule } from './modules';
import { createProgram } from './programs';
import { createPipelineLayout } from './layouts';
import { configureSwapChain } from './chains';

export const createRenderer = async (device, canvas, context, options) => {
    const swapChain = await configureSwapChain(context, { device, format: await context.getSwapChainPreferredFormat(device) });

    const renderPassDescriptor = await loadResource('webgpuRenderPass.json');
    const textureResource = await loadResource('marble.png');
    const strategy = {
        commands: []
    };

    const renderables = {
        add(scene) {
            const resources = scene.resources;
            const buffers = resources.buffers.staticBuffer;

            const sampler = device.createSampler({
                minFilter: "linear",
                magFilter: "linear"
            });

            let textureDataCanvas = document.createElement("canvas");
            let textureDataCtx = textureDataCanvas.getContext("2d");
            textureDataCanvas.width = textureResource.width;
            textureDataCanvas.height = textureResource.height;
            textureDataCtx.drawImage(textureResource, 0, 0);
            const textureData = textureDataCtx.getImageData(0, 0, textureResource.width, textureResource.height).data;

            const textureDataBuffer = device.createBuffer({
                size: textureData.byteLength,
                usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
            });

            textureDataBuffer.setSubData(0, textureData);

            const texture = device.createTexture({
                size: [textureResource.width, textureResource.height, 1],
                format: "rgba8unorm",
                usage: GPUTextureUsage.SAMPLED | GPUTextureUsage.COPY_DST
            });

            const textureLoadEncoder = device.createCommandEncoder();
            textureLoadEncoder.copyBufferToTexture({
                buffer: textureDataBuffer,
                rowPitch: textureResource.width * 4,
                imageHeight: textureResource.height
            }, { texture, },
                [
                    textureResource.width,
                    textureResource.height,
                    1
                ]);

            device.defaultQueue.submit([textureLoadEncoder.finish()]);

            const vertexUniformBuffer = device.createBuffer({
                size: 36,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
            });

            const viewProjectionMatrix = new Float32Array([
                0.02, 0, 0,
                0, 0.02, 0,
                -1, -1, 0
            ]);

            vertexUniformBuffer.setSubData(0, viewProjectionMatrix);

            const uniformBindGroupLayout = device.createBindGroupLayout({
                bindings: [
                    {
                        binding: 0,
                        visibility: GPUShaderStage.VERTEX,
                        type: "uniform-buffer"
                    },
                    {
                        binding: 1,
                        visibility: GPUShaderStage.FRAGMENT,
                        type: "sampler"
                    },
                    {
                        binding: 2,
                        visibility: GPUShaderStage.FRAGMENT,
                        type: "sampled-texture"
                    }
                ]
            });

            const uniformBindGroup = device.createBindGroup({
                layout: uniformBindGroupLayout,
                bindings: [
                    {
                        binding: 0,
                        resource: {
                            buffer: vertexUniformBuffer
                        }
                    },
                    {
                        binding: 1,
                        resource: sampler
                    },
                    {
                        binding: 2,
                        resource: texture.createView()
                    }

                ]
            });

            const programOptions = {
                layout: createPipelineLayout(device, { bindGroupLayouts: [uniformBindGroupLayout] }),
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

            const modelTransformations = new Float32Array([
                1, 0, 0,
                0, 1, 0,
                10, 10, 1
            ]);

            const vertexBuffer = createBuffer(device, new Float32Array(buffers.data), vertexBufferUsage | copyDestinationBufferUsage);
            const indexBuffer = createBuffer(device, new Uint16Array(buffers.indices), indexBufferUsage | copyDestinationBufferUsage);
            const instanceBuffer = createBuffer(device, modelTransformations, vertexBufferUsage | copyDestinationBufferUsage);

            const commandEncoder = device.createCommandEncoder();
            const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
            passEncoder.setPipeline(pipeline);
            passEncoder.setBindGroup(0, uniformBindGroup);
            passEncoder.setViewport(0, 0, canvas.width, canvas.height, 0, 1);
            passEncoder.setScissorRect(0, 0, canvas.width, canvas.height);
            passEncoder.setVertexBuffer(0, vertexBuffer);
            passEncoder.setVertexBuffer(1, instanceBuffer);
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
import { loadResource, resizeCanvas, matrix4 } from '../imports';
import { createBuffer, bufferData, vertexBufferUsage, indexBufferUsage, copyDestinationBufferUsage } from './buffers';
import { createSprite } from '../components/sprite';
import { createPipelineLayout } from './layouts';
import { createShaderModule } from './modules';
import { configureSwapChain } from './chains';
import { createProgram } from './programs';
import { createShader } from './shaders';

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
            const buffers = resources.buffers;

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
                size: 64,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
            });

            const viewProjectionMatrix = matrix4.orthographic(100, canvas.width / canvas.height);

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

            const entities = scene.entities;
            const count = entities.length;
            const modelTransformations = new Float32Array(count * 6);

            for (let i = 0; i < count; i++) {
                const entity = entities[i];
                entity.sprite = createSprite(entity.transform, { data: modelTransformations }, i);
            }

            const staticData = new Float32Array(buffers.staticBuffer.data);

            const vertexBuffers = [
                {
                    data: staticData,
                    handle: createBuffer(device, staticData, vertexBufferUsage | copyDestinationBufferUsage)
                },
                {
                    data: modelTransformations,
                    handle: createBuffer(device, modelTransformations, vertexBufferUsage | copyDestinationBufferUsage)
                }
            ];

            const indexData = new Uint16Array(buffers.staticBuffer.indices);
            const indexBuffer = createBuffer(device, indexData, indexBufferUsage | copyDestinationBufferUsage);
            bufferData(indexBuffer, indexData);

            strategy.commands.push({
                uniformBindGroup,
                vertexBuffers,
                indexBuffer,
                pipeline,
                canvas,
                count
            });
        },
        delete(scene) {
        }
    };

    return {
        renderables,
        render(deltaTime) {
            resizeCanvas(canvas, options.scale);

            renderPassDescriptor.colorAttachments[0].attachment = swapChain.getCurrentTexture().createView();

            for (const command of strategy.commands) {
                const commandEncoder = device.createCommandEncoder();
                const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
                passEncoder.setPipeline(command.pipeline);
                passEncoder.setBindGroup(0, command.uniformBindGroup);
                passEncoder.setViewport(0, 0, command.canvas.width, command.canvas.height, 0, 1);
                passEncoder.setScissorRect(0, 0, command.canvas.width, command.canvas.height);

                const vertexBuffers = command.vertexBuffers;
                for (let i = 0; i < vertexBuffers.length; i++) {
                    const vertexBuffer = vertexBuffers[i];
                    bufferData(vertexBuffer.handle, vertexBuffer.data);
                    passEncoder.setVertexBuffer(i, vertexBuffer.handle);
                }

                passEncoder.setIndexBuffer(command.indexBuffer);
                passEncoder.drawIndexed(4, command.count, 0, 0, 0);
                passEncoder.endPass();
                device.defaultQueue.submit([commandEncoder.finish()]);
            }
        }
    }
}
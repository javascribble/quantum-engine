import { loadResource, resizeCanvas, matrix4 } from '../imports';
import { createSprite } from '../components/sprite';
import { createCopyBuffer, bufferData, createVertexBuffer, createIndexBuffer, createUniformBuffer } from './buffers';
import { createCommand, encodeCommand } from './commands';
import { createPreferredSwapChain } from './context';
import { createSampledTexture } from './textures';
import { createPipelineLayout } from './layouts';
import { createShaderModule } from './modules';
import { createProgram } from './programs';
import { createShader } from './shaders';
import { createSampler } from './samplers';

export const createRenderable = async (device, canvas, context, options) => {
    const swapChain = await createPreferredSwapChain(context, device);

    const renderPassDescriptor = await loadResource('webgpuRenderPass.json');
    const textureResource = await loadResource('marble.png');
    const strategy = { commands: [] };

    const renderables = {
        add(scene) {
            const commands = scene.commands;
            const resources = scene.resources;
            const buffers = resources.buffers;

            const sampler = createSampler(device);

            let textureDataCanvas = document.createElement('canvas');
            let textureDataCtx = textureDataCanvas.getContext('2d');
            textureDataCanvas.width = textureResource.width;
            textureDataCanvas.height = textureResource.height;
            textureDataCtx.drawImage(textureResource, 0, 0);
            const textureData = textureDataCtx.getImageData(0, 0, textureResource.width, textureResource.height).data;

            const textureDataBuffer = createCopyBuffer(device, { size: textureData.byteLength });

            textureDataBuffer.setSubData(0, textureData);

            const texture = createSampledTexture(device, [textureResource.width, textureResource.height, 1], 'rgba8unorm');

            const textureLoadEncoder = device.createCommandEncoder();
            textureLoadEncoder.copyBufferToTexture(
                {
                    buffer: textureDataBuffer,
                    rowPitch: textureResource.width * 4,
                    imageHeight: textureResource.height
                },
                { texture },
                [
                    textureResource.width,
                    textureResource.height,
                    1
                ]
            );

            device.defaultQueue.submit([textureLoadEncoder.finish()]);

            const vertexUniformBuffer = createUniformBuffer(device, { size: 64 });

            const viewProjectionMatrix = matrix4.orthographic(100, canvas.width / canvas.height);

            bufferData(vertexUniformBuffer, 0, viewProjectionMatrix);

            const uniformBindGroupLayout = device.createBindGroupLayout(scene.resources.layouts.defaultLayout);

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
                    handle: createVertexBuffer(device, { size: staticData.byteLength })
                },
                {
                    data: modelTransformations,
                    handle: createVertexBuffer(device, { size: modelTransformations.byteLength })
                }
            ];

            const indexData = new Uint16Array(buffers.staticBuffer.indices);
            const indexBuffer = createIndexBuffer(device, { size: indexData.byteLength });

            bufferData(indexBuffer, 0, indexData);

            //const command = createCommand(device, );

            strategy.commands.push({ uniformBindGroup, vertexBuffers, indexBuffer, pipeline, count });
        },
        delete(scene) {
        }
    };

    return {
        renderables,
        render(deltaTime) {
            resizeCanvas(canvas, options.scale);

            renderPassDescriptor.colorAttachments[0].attachment = swapChain.getCurrentTexture().createView();

            //device.defaultQueue.submit(strategy.commands.map(encodeCommand));

            for (const command of strategy.commands) {
                const commandEncoder = device.createCommandEncoder();
                const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
                passEncoder.setPipeline(command.pipeline);
                passEncoder.setBindGroup(0, command.uniformBindGroup);
                passEncoder.setViewport(0, 0, canvas.width, canvas.height, 0, 1);
                passEncoder.setScissorRect(0, 0, canvas.width, canvas.height);

                const vertexBuffers = command.vertexBuffers;
                for (let i = 0; i < vertexBuffers.length; i++) {
                    const vertexBuffer = vertexBuffers[i];
                    bufferData(vertexBuffer.handle, 0, vertexBuffer.data);
                    passEncoder.setVertexBuffer(i, vertexBuffer.handle);
                }

                passEncoder.setIndexBuffer(command.indexBuffer);
                passEncoder.drawIndexed(4, command.count, 0, 0, 0);
                passEncoder.endPass();
                device.defaultQueue.submit([commandEncoder.finish()]);
            }
        }
    }
};
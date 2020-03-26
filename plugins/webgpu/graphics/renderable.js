import { loadResource, addComponent, matrix4 } from '../imports';
import { createSprite } from '../components/sprite';
import { createCopyBuffer, bufferData, createVertexBuffer, createIndexBuffer, createUniformBuffer } from './buffers';
import { createSampledTexture, createDepthTexture } from './textures';
import { createCommand } from './commands';
import { createPreferredSwapChain } from './context';
import { createPipelineLayout } from './layouts';
import { createShaderModule } from './modules';
import { createProgram } from './programs';
import { createShader } from './shaders';
import { createSampler } from './samplers';
import { createCanvasViewport } from './viewport';

export const createRenderable = async (device, canvas, context, options) => {
    const swapChain = await createPreferredSwapChain(context, device);
    const strategy = { commands: [] };
    const renderables = {
        add(entity) {
            const scene = entity.scene;
            const resources = scene.resources;
            const buffers = resources.buffers;
            const renderPassDescriptor = resources.passes.defaultRenderPass;
            const textureResource = resources.textures.defaultTexture.sprites[0];

            const imageSize = [
                textureResource.imageBitmap.width,
                textureResource.imageBitmap.height,
                1
            ];

            const sampler = createSampler(device);
            const texture = createSampledTexture(device, { size: imageSize });

            const gpuImageBitmapCopyView = {
                imageBitmap: textureResource.imageBitmap,
                origin: { x: 0, y: 0 }
            };

            const gpuTextureCopyView = { texture };

            device.defaultQueue.copyImageBitmapToTexture(gpuImageBitmapCopyView, gpuTextureCopyView, imageSize);

            const viewProjectionMatrix = matrix4.orthographic(100, canvas.width / canvas.height);
            const vertexUniformBuffer = createUniformBuffer(device, { size: viewProjectionMatrix.byteLength });
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

            const depthTextureDescriptor = {
                format: 'depth24plus-stencil8',
                size: {
                    width: canvas.width,
                    height: canvas.height,
                    depth: 1
                }
            };

            renderPassDescriptor.depthStencilAttachment.attachment = createDepthTexture(device, depthTextureDescriptor).createView();

            const entities = scene.entities;
            const count = entities.length;
            const modelTransformations = new Float32Array(count * 6);
            const staticData = new Float32Array(buffers.staticBuffer.data);
            const vertexBuffers = [
                {
                    data: staticData,
                    handle: createVertexBuffer(device, { size: staticData.byteLength }),
                    index: 0,
                    changed: true
                },
                {
                    data: modelTransformations,
                    handle: createVertexBuffer(device, { size: modelTransformations.byteLength }),
                    index: 0,
                    changed: true
                }
            ];

            bufferData(vertexBuffers[0].handle, 0, vertexBuffers[0].data);

            for (let i = 0; i < count; i++) {
                const entity = entities[i];
                entity.sprite = createSprite(entity.transform, vertexBuffers[1], i);
                addComponent('sprite', entity);
            }

            const indexData = new Uint16Array(buffers.staticBuffer.indices);
            const indexBuffer = {
                data: indexData,
                handle: createIndexBuffer(device, { size: indexData.byteLength }),
                index: 0,
                changed: true
            };

            bufferData(indexBuffer.handle, 0, indexBuffer.data);

            const command = {
                passes: [
                    {
                        swapChain,
                        descriptor: renderPassDescriptor,
                        pipeline,
                        viewport: createCanvasViewport(canvas),
                        scissorRect: {
                            x: 0,
                            y: 0,
                            width: canvas.width,
                            height: canvas.height
                        },
                        bindGroups: [uniformBindGroup],
                        vertexBuffers,
                        indexBuffer,
                        draws: [
                            {
                                indexed: true,
                                count: 4,
                                instances: count,
                                firstElement: 0,
                                firstInstance: 0,
                                baseVertex: 0
                            }
                        ]
                    }
                ]
            };

            strategy.commands.push(command);
        },
        delete(entity) {
        }
    };

    return {
        renderables,
        render(deltaTime) {
            const commands = strategy.commands.map(command => createCommand(device, command));
            device.defaultQueue.submit(commands);
        }
    }
};
import { matrix4 } from '../imports';
import { bufferData, createIndexBuffer, createUniformBuffer, createVertexBuffer } from '../graphics/buffers';
import { createDepthTexture, createSampledTexture } from '../graphics/textures';
import { createCanvasViewport } from '../graphics/viewport';
import { createPipelineLayout } from '../graphics/layouts';
import { createShaderModule } from '../graphics/modules';
import { createProgram } from '../graphics/programs';
import { createSampler } from '../graphics/samplers';
import { createShader } from '../graphics/shaders';

export const updateStrategy = (commands, targets, adds, deletes) => {
    if (commands.size === 0) {
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
        const staticDataBuffer = createVertexBuffer(device, { size: staticData.byteLength });
        const modelTransformationsBuffer = createVertexBuffer(device, { size: modelTransformations.byteLength });
        const vertexBuffers = [
            staticDataBuffer,
            modelTransformationsBuffer
        ];

        bufferData(staticDataBuffer, 0, staticData);

        const indexData = new Uint16Array(buffers.staticBuffer.indices);
        const indexBuffer = createIndexBuffer(device, { size: indexData.byteLength });
        bufferData(indexBuffer, 0, indexData);

        const vertexDataProxy = {
            data: modelTransformations,
            buffer: modelTransformationsBuffer,
            index: 0
        };

        for (let i = 0; i < count; i++) {
            const entity = entities[i];
            entity.sprite = createSprite(entity.transform, vertexDataProxy, i);
        }

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

        commands.set('default', command);
    }

    command.descriptor.colorAttachments[0].attachment = renderer.swapChain.getCurrentTexture().createView();
};
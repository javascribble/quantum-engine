import { bufferData } from './buffers';

export const createCommand = (canvas, renderPassDescriptor, uniformBindGroup, vertexBuffers, indexBuffer, pipeline, count) => ({
    passes: [
        {
            descriptor: renderPassDescriptor,
            pipeline,
            viewport: {
                x: 0,
                y: 0,
                width: canvas.width,
                height: canvas.height,
                minDepth: 0,
                maxDepth: 1
            },
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
});

export const encodeCommand = (device, command) => {
    const commandEncoder = device.createCommandEncoder();
    for (const pass of command.passes) {
        if (pass.compute) {
            const { descriptor } = pass;

            const computePassEncoder = commandEncoder.beginComputePass(descriptor);

            computePassEncoder.endPass();
        } else {
            const { descriptor, pipeline, viewport, scissorRect, bindGroups, vertexBuffers, indexBuffer, draws } = pass;

            const renderPassEncoder = commandEncoder.beginRenderPass(descriptor);
            renderPassEncoder.setPipeline(pipeline);

            // TODO: Set this only on viewport resize.
            if (viewport) {
                renderPassEncoder.setViewport(viewport.x, viewport.y, viewport.width, viewport.height, viewport.minDepth, viewport.maxDepth);
            }

            if (scissorRect) {
                renderPassEncoder.setScissorRect(scissorRect.x, scissorRect.y, scissorRect.width, scissorRect.height); //canvas.width/height
            }

            if (bindGroups) {
                for (let i = 0; i < bindGroups.length; i++) {
                    renderPassEncoder.setBindGroup(i, bindGroups[i]); //does this need to be reuploaded if nothing changed?
                }
            }

            if (vertexBuffers) {
                for (let i = 0; i < vertexBuffers.length; i++) {
                    const vertexBuffer = vertexBuffers[i];
                    if (vertexBuffer.changed) {
                        bufferData(vertexBuffer.handle, vertexBuffer.index, vertexBuffer.data);
                        vertexBuffer.changed = false;
                    }

                    renderPassEncoder.setVertexBuffer(i, vertexBuffer.handle);
                }
            }

            if (indexBuffer) {
                if (indexBuffer.changed) {
                    bufferData(indexBuffer.handle, indexBuffer.index, indexBuffer.data);
                    indexBuffer.changed = false;
                }

                renderPassEncoder.setIndexBuffer(indexBuffer.handle);
            }

            if (draws) {
                for (const draw of draws) {
                    const indexed = draw.indexed;
                    const indirect = draw.indirect;
                    if (indexed) {
                        if (indirect) {
                            renderPassEncoder.drawIndexedIndirect(draw.buffer, draw.offset);
                        } else {
                            renderPassEncoder.drawIndexed(draw.count, draw.instances, draw.firstElement, draw.baseVertex, draw.firstInstance);
                        }
                    } else {
                        if (indirect) {
                            renderPassEncoder.drawIndirect(draw.buffer, draw.offset);
                        } else {
                            renderPassEncoder.draw(draw.count, draw.instances, draw.firstElement, draw.firstInstance);
                        }
                    }
                }
            }

            renderPassEncoder.endPass();
        }
    }

    return commandEncoder.finish();
};

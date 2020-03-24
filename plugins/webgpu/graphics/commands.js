export const createCommand = (test) => {
    return {
        passes: [
            {
            }
        ]
    }
}

export const encodeCommand = (device, command) => {
    const commandEncoder = device.createCommandEncoder();
    for (const pass of command.passes) {
        if (pass.compute) {
            const computePassEncoder = commandEncoder.beginComputePass(pass.descriptor);
            computePassEncoder.endPass();
        } else {
            const renderPassEncoder = commandEncoder.beginRenderPass(pass.descriptor);
            renderPassEncoder.setPipeline(renderPass.pipeline);

            // TODO: Set this only on viewport resize.
            const viewport = renderPass.viewport;
            if (viewport) {
                renderPassEncoder.setViewport(viewport.x, viewport.y, viewport.width, viewport.height, viewport.minDepth, viewport.maxDepth);
            }

            const scissorRect = renderPass.scissorRect;
            if (scissorRect) {
                renderPassEncoder.setScissorRect(scissorRect.x, scissorRect.y, scissorRect.width, scissorRect.height); //canvas.width/height
            }

            const bindGroups = renderPass.bindGroups;
            if (bindGroups) {
                for (let i = 0; i < bindGroups.length; i++) {
                    renderPassEncoder.setBindGroup(i, bindGroups[i]); //does this need to be reuploaded if nothing changed?
                }
            }

            const vertexBuffers = renderPass.vertexBuffers;
            if (vertexBuffers) {
                for (let i = 0; i < vertexBuffers.length; i++) {
                    const vertexBuffer = vertexBuffers[i];
                    if (vertexBuffer.changed) {
                        bufferData(vertexBuffer.handle, vertexBuffer.index, vertexBuffer.data);
                    }

                    renderPassEncoder.setVertexBuffer(i, vertexBuffer.handle);
                }
            }

            const indexBuffer = renderPass.indexBuffer;
            if (indexBuffer) {
                if (indexBuffer.changed) {
                    bufferData(indexBuffer.handle, indexBuffer.index, indexBuffer.data);
                }

                renderPassEncoder.setIndexBuffer(indexBuffer.handle);
            }

            const draws = renderPass.draws;
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

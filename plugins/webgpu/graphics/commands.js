export const createCommand = (device, options) => {
    const commandEncoder = device.createCommandEncoder();
    encodeCommand(options, commandEncoder);
    return commandEncoder.finish();
}

const encodeCommand = (command, commandEncoder) => {
    for (const pass of command.passes) {
        if (pass.compute) {
            const computePassEncoder = commandEncoder.beginComputePass(pass.descriptor);
            encodeComputePass(pass, computePassEncoder);
            computePassEncoder.endPass();
        } else {
            // TODO: Unhack this.
            pass.descriptor.colorAttachments[0].attachment = pass.swapChain.getCurrentTexture().createView();

            const renderPassEncoder = commandEncoder.beginRenderPass(pass.descriptor);
            encodeRenderPass(pass, renderPassEncoder);
            renderPassEncoder.endPass();
        }
    }
};

const encodeComputePass = (computePass, computePassEncoder) => {
    const { } = computePass;
    encodePass(computePass, computePassEncoder);

    computePassEncoder.dispatch(0);
};

const encodeRenderPass = (renderPass, renderPassEncoder) => {
    const { pipeline, viewport, scissorRect, bindGroups, vertexBuffers, indexBuffer, draws } = renderPass;
    encodePass(renderPass, renderPassEncoder);

    // TODO: Set this only on viewport resize.
    if (viewport) {
        renderPassEncoder.setViewport(viewport.x, viewport.y, viewport.width, viewport.height, viewport.minDepth, viewport.maxDepth);
    }

    if (scissorRect) {
        renderPassEncoder.setScissorRect(scissorRect.x, scissorRect.y, scissorRect.width, scissorRect.height); //canvas.width/height
    }

    if (vertexBuffers) {
        for (let i = 0; i < vertexBuffers.length; i++) {
            renderPassEncoder.setVertexBuffer(i, vertexBuffers[i].handle);
        }
    }

    if (indexBuffer) {
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
};

const encodePass = (pass, passEncoder) => {
    const { pipeline, bindGroups } = pass;

    passEncoder.setPipeline(pipeline);
    if (bindGroups) {
        for (let i = 0; i < bindGroups.length; i++) {
            passEncoder.setBindGroup(i, bindGroups[i]);
        }
    }
};
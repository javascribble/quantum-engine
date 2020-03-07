export async function testWebGPU() {
    const positions = new Float32Array([
        1.0, -1.0, 0.0,
        -1.0, -1.0, 0.0,
        0.0, 1.0, 0.0
    ]);

    const colors = new Float32Array([
        1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 0.0, 1.0
    ]);

    const indices = new Uint16Array([0, 1, 2]);

    let adapter = await navigator.gpu.requestAdapter();
    let device = await adapter.requestDevice();
    let queue = device.defaultQueue;

    let canvas = document.createElement('canvas');
    document.body.appendChild(canvas);

    const context = canvas.getContext('gpupresent');
    const swapChainDesc = {
        device: device,
        format: 'bgra8unorm',
        usage: GPUTextureUsage.OUTPUT_ATTACHMENT | GPUTextureUsage.COPY_SRC
    };

    let swapchain = context.configureSwapChain(swapChainDesc);

    const depthSize = {
        width: canvas.width,
        height: canvas.height,
        depth: 1
    };

    const depthTextureDesc = {
        size: depthSize,
        arrayLayerCount: 1,
        mipLevelCount: 1,
        sampleCount: 1,
        dimension: '2d',
        format: 'depth24plus-stencil8',
        usage: GPUTextureUsage.OUTPUT_ATTACHMENT | GPUTextureUsage.COPY_SRC
    };

    let depthTexture = device.createTexture(depthTextureDesc);
    let depthTextureView = depthTexture.createView();

    let createBuffer = (arr, usage) => {
        let desc = { size: arr.byteLength, usage };
        let [buffer, bufferMapped] = device.createBufferMapped(desc);
        const writeArray = arr instanceof Uint16Array ? new Uint16Array(bufferMapped) : new Float32Array(bufferMapped);
        writeArray.set(arr);
        buffer.unmap();
        return buffer;
    };

    let positionBuffer = createBuffer(positions, GPUBufferUsage.VERTEX);
    let colorBuffer = createBuffer(colors, GPUBufferUsage.VERTEX);
    let indexBuffer = createBuffer(indices, GPUBufferUsage.INDEX);

    let loadShader = (shaderPath) =>
        fetch(new Request(shaderPath), { method: 'GET', mode: 'cors' }).then((res) =>
            res.arrayBuffer().then((arr) => new Uint32Array(arr))
        );

    let vertModule = device.createShaderModule({ code: await loadShader('/resources/triangle.vert.spv') });
    let fragModule = device.createShaderModule({ code: await loadShader('/resources/triangle.frag.spv') });

    const positionAttribDesc = {
        shaderLocation: 0,
        offset: 0,
        format: 'float3'
    };

    const colorAttribDesc = {
        shaderLocation: 1,
        offset: 0,
        format: 'float3'
    };

    const positionBufferDesc = {
        attributes: [positionAttribDesc],
        arrayStride: 4 * 3,
        stepMode: 'vertex'
    };

    const colorBufferDesc = {
        attributes: [colorAttribDesc],
        arrayStride: 4 * 3,
        stepMode: 'vertex'
    };

    const vertexState = {
        indexFormat: 'uint16',
        vertexBuffers: [positionBufferDesc, colorBufferDesc]
    };

    const depthStencilState = {
        depthWriteEnabled: true,
        depthCompare: 'less',
        format: 'depth24plus-stencil8'
    };

    const pipelineLayoutDesc = { bindGroupLayouts: [] };
    const layout = device.createPipelineLayout(pipelineLayoutDesc);

    const vertexStage = {
        module: vertModule,
        entryPoint: 'main'
    };

    const fragmentStage = {
        module: fragModule,
        entryPoint: 'main'
    };

    const colorState = {
        format: 'bgra8unorm',
        alphaBlend: {
            srcFactor: 'src-alpha',
            dstFactor: 'one-minus-src-alpha',
            operation: 'add'
        },
        colorBlend: {
            srcFactor: 'src-alpha',
            dstFactor: 'one-minus-src-alpha',
            operation: 'add'
        },
        writeMask: GPUColorWrite.ALL
    };

    const rasterizationState = {
        frontFace: 'cw',
        cullMode: 'none'
    };

    let pipeline = device.createRenderPipeline({
        layout,
        vertexStage,
        fragmentStage,
        primitiveTopology: 'triangle-list',
        colorStates: [colorState],
        depthStencilState,
        vertexState,
        rasterizationState
    });

    let colorTexture = swapchain.getCurrentTexture();
    let colorTextureView = colorTexture.createView();

    let colorAttachment = {
        attachment: colorTextureView,
        loadValue: { r: 0, g: 0, b: 0, a: 1 },
        storeOp: 'store'
    };

    const depthAttachment = {
        attachment: depthTextureView,
        depthLoadValue: 1,
        depthStoreOp: 'store',
        stencilLoadValue: 'load',
        stencilStoreOp: 'store'
    };

    const renderPassDesc = {
        colorAttachments: [colorAttachment],
        depthStencilAttachment: depthAttachment
    };

    let commandEncoder = device.createCommandEncoder();
    let passEncoder = commandEncoder.beginRenderPass(renderPassDesc);
    passEncoder.setPipeline(pipeline);
    passEncoder.setViewport(0, 0, canvas.width, canvas.height, 0, 1);
    passEncoder.setScissorRect(0, 0, canvas.width, canvas.height);
    passEncoder.setVertexBuffer(0, positionBuffer);
    passEncoder.setVertexBuffer(1, colorBuffer);
    passEncoder.setIndexBuffer(indexBuffer);
    passEncoder.drawIndexed(3, 1, 0, 0, 0);
    passEncoder.endPass();
    queue.submit([commandEncoder.finish()]);
}

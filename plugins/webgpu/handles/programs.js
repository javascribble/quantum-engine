export const createProgram = (device, program) => {
    program.layout = device.createPipelineLayout({ bindGroupLayouts: [] });
    program.vertexStage.module = device.createShaderModule({ code: program.vertexStage.module });
    program.fragmentStage.module = device.createShaderModule({ code: program.fragmentStage.module });
    return program;
}

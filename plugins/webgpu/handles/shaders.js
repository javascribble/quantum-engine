export function createShader(device, code) {
    return device.createShaderModule({ code });
}

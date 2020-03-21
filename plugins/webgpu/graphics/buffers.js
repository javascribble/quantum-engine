export const indexBufferUsage = GPUBufferUsage.INDEX;
export const vertexBufferUsage = GPUBufferUsage.VERTEX;
export const copyDestinationBufferUsage = GPUBufferUsage.COPY_DST;

export const createBuffer = (device, array, usage) => {
    const buffer = device.createBuffer({ size: array.byteLength, usage });
    buffer.setSubData(0, array);
    return buffer;
}

export const bufferData = (buffer, data) => buffer.setSubData(buffer.index, data);

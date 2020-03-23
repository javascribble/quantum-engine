export const indexBufferUsage = GPUBufferUsage.INDEX;
export const vertexBufferUsage = GPUBufferUsage.VERTEX;
export const copyDestinationBufferUsage = GPUBufferUsage.COPY_DST;

export const createBuffer = (device, array, usage) => device.createBuffer({ size: array.byteLength, usage });

export const bufferData = (buffer, data) => buffer.setSubData(0, data);

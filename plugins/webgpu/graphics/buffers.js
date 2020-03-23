const indexBufferUsage = GPUBufferUsage.INDEX;
const vertexBufferUsage = GPUBufferUsage.VERTEX;
const uniformBufferUsage = GPUBufferUsage.UNIFORM;
const copySourceBufferUsage = GPUBufferUsage.COPY_SRC;
const copyDestinationBufferUsage = GPUBufferUsage.COPY_DST;

export const createUniformBuffer = (device, size) => createBuffer(device, size, uniformBufferUsage | copyDestinationBufferUsage);

export const createVertexBuffer = (device, size) => createBuffer(device, size, vertexBufferUsage | copyDestinationBufferUsage);

export const createIndexBuffer = (device, size) => createBuffer(device, size, indexBufferUsage | copyDestinationBufferUsage);

export const createCopyBuffer = (device, size) => createBuffer(device, size, copyDestinationBufferUsage | copySourceBufferUsage);

export const createBuffer = (device, size, usage) => device.createBuffer({ usage, size });

export const bufferData = (buffer, index, data) => buffer.setSubData(index, data);

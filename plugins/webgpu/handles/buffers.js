export const createBuffer = (device, array, usage) => {
    //device.createBuffer/mapWriteAsync/mapReadAsync
    const [gpuBuffer, arrayBuffer] = device.createBufferMapped({ size: array.byteLength, usage });
    const typedArray = array instanceof Uint16Array ? new Uint16Array(arrayBuffer) : new Float32Array(arrayBuffer)
    typedArray.set(array);
    gpuBuffer.unmap();
    return gpuBuffer; //setSubData
}

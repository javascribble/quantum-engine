export function createBuffer(device, array, usage) {
    const [buffer, bufferMapped] = device.createBufferMapped({ size: array.byteLength, usage });
    const typedArray = array instanceof Uint16Array ? new Uint16Array(bufferMapped) : new Float32Array(bufferMapped)
    typedArray.set(array);
    buffer.unmap();
    return buffer;
}
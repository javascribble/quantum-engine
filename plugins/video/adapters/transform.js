export default (engine) => {
    const transforms = new Set();
    engine.systems.set('transform', transforms);
    engine.updates.add({
        update: (deltaTime) => {
            for (const transform of transforms) {
                if (transform.changed) {
                    copyTransform(transform, renderable.data);
                    //bufferData(renderable.buffer, renderable.index, renderable.data);
                    transform.changed = false;
                }
            }
        }
    });
};

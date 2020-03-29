import { bufferData } from '../graphics/buffers';
import { meshComponent } from '../components/mesh';
import { copyTransform, transformComponent } from '../components/transform';

export const createTransformSystem = (options) => {
    const entities = new Set();
    return {
        components: [transformComponent, meshComponent],
        async add(entity) {
            entities.add(entity);
        },
        delete(entity) {
            entities.add(entity);
        },
        update(deltaTime) {
            for (const entity of entities) {
                const transform = entity.transform;
                if (transform.changed) {
                    copyTransform(transform, renderable.data);
                    bufferData(renderable.buffer, renderable.index, renderable.data);
                    transform.changed = false;
                }
            }
        }
    }
};

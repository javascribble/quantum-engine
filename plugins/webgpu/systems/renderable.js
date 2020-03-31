import { meshComponent } from '../components/mesh';
import { materialComponent } from '../components/material';

export const createRenderableSystem = (options) => {
    const device = options.device;

    return {
        components: [meshComponent, materialComponent],
        add(entity) {
        },
        delete(entity) {
        },
        update(deltaTime) {
        }
    }
};

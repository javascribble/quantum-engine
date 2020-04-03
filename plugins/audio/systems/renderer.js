import { updates, systems } from '../../../engine/main';

export const enableRendererSystem = () => {
    systems.add({
        components: [],
        add: (entity) => {
        },
        delete: (entity) => {
        }
    });

    updates.add((deltaTime) => {
    });
};
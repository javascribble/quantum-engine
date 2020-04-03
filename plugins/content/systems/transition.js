import { createEntity, isInteger } from '../../../engine/main';

const defaultTransitionOptions = {
};

export const enableTransitionSystem = async (transitionOptions) => {
    const options = {
        ...defaultTransitionOptions,
        ...transitionOptions
    };

    const entities = new Map();
    for (const entity of options.entities) {
        const resources = entity.resources;
        if (resources) {
            for (let i = 0; i < resources.length; i++) {
                const resource = resources[i]
                if (isInteger(resource)) {
                    resources[i] = options.resources[resource];
                }
            }
        }

        entities.add(createEntity(entity));
    }

    systems.add({
        components: ['scene'],
        add: (entity) => {
            // TODO: Instiantiate entity.scene.entities
        },
        delete: (entity) => {
            // TODO: Delete entity.scene.entities
        },
        update: (deltaTime) => {
            // TODO: Observe scene index/name and transition on change.
        }
    });

    updates.add((deltaTime) => {
    });
};
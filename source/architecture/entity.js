import { bindComponents, unbindComponents } from './component.js';

export const initializeEntities = (entities, systems) => {
    entities.onAdd = entity => {
        entity.systems = [];
        for (const system of systems) {
            if (system.validate(entity)) {
                bindComponents(entity, system);
            }
        }

        entity.update = () => {
            for (const system of systems) {
                const valid = system.validate(entity);
                const exists = system.entities.has(entity);
                if (valid && !exists) {
                    bindComponents(entity, system);
                } else if (!valid && exists) {
                    unbindComponents(entity, system);
                }
            }
        };
    };

    entities.onDelete = entity => {
        for (const system of entity.systems) {
            unbindComponents(entity, system);
        }

        delete entity.systems;
        delete entity.update;
    };
};
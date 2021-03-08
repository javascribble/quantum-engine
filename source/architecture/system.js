import { bindComponents, unbindComponents } from './component.js';

export const initializeSystems = (systems, entities) => {
    systems.onAdd = system => {
        system.entities = [];
        for (const entity of entities) {
            if (system.validate(entity)) {
                bindComponents(entity, system);
            }
        }
    };

    systems.onDelete = system => {
        for (const entity of system.entities) {
            unbindComponents(entity, system);
        }

        delete system.entities;
    };
};
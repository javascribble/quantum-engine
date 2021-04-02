const { ObservableSet } = quantum;

const bindComponents = (entity, system) => {
    system.entities.push(entity);
    entity.systems.push(system);
};

const unbindComponents = (entity, system) => {
    system.entities.remove(entity);
    entity.systems.remove(system);
};

const initializeEntities = (entities, systems) => {
    entities.onAdd = entity => {
        entity.update = () => {
            for (const system of systems) {
                const valid = system.validate(entity);
                const exists = system.entities.includes(entity);
                if (valid && !exists) {
                    bindComponents(entity, system);
                } else if (!valid && exists) {
                    unbindComponents(entity, system);
                }
            }
        };

        entity.systems = [];
        for (const system of systems) {
            if (system.validate(entity)) {
                bindComponents(entity, system);
            }
        }
    };

    entities.onDelete = entity => {
        for (const system of entity.systems) {
            unbindComponents(entity, system);
        }

        delete entity.systems;
        delete entity.update;
    };
};

const initializeSystems = (systems, entities) => {
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

export const initializeECS = () => {
    const systems = new ObservableSet();
    const entities = new ObservableSet();
    initializeEntities(entities, systems);
    initializeSystems(systems, entities);
    return { entities, systems };
};
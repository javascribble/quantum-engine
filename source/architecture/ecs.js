const { ObservableSet } = quantum;

export const initializeECS = () => {
    const systems = new ObservableSet();
    systems.onAdd = system => system.entities = [];
    systems.onDelete = system => delete system.entities;

    const entities = new ObservableSet();
    entities.onAdd = entity => {
        entity.systems = [];
        for (const system of systems) {
            if (system.validate(entity)) {
                system.entities.push(entity);
                entity.systems.push(system);
            }
        }

        entity.update = () => {
            for (const system of systems) {
                const valid = system.validate(entity);
                const exists = system.entities.has(entity);
                if (valid && !exists) {
                    system.entities.push(entity);
                    entity.systems.push(system);
                } else if (!valid && exists) {
                    system.entities.remove(entity);
                    entity.systems.remove(system);
                }
            }
        };
    };

    entities.onDelete = entity => {
        for (const system of entity.systems) {
            system.entities.remove(entity);
        }

        delete entity.systems;
        delete entity.update;
    };

    return { entities, systems };
};
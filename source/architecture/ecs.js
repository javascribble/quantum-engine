const { ObservableSet } = quantum;

export const initializeECS = () => {
    const entities = new ObservableSet();
    const systems = new ObservableSet();

    const update = () => {
        for (const system of systems) {
            const valid = system.validate(this);
            const exists = system.entities.has(this);
            if (valid && !exists) {
                system.entities.push(this);
                this.systems.push(system);
            } else if (!valid && exists) {
                system.entities.remove(this);
                this.systems.remove(system);
            }
        }
    };

    entities.onAdd = entity => {
        entity.update = update.bind(entity);
        entity.systems = [];
        for (const system of systems) {
            if (system.validate(entity)) {
                system.entities.push(entity);
                entity.systems.push(system);
            }
        }
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
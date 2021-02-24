export const architecturePlugin = engine => {
    const entities = [];
    const systems = [];

    const attachEntity = entity => {
        entity.systems = [];
        for (const system of systems) {
            if (system.validate(entity)) {
                system.entities.push(entity);
                entity.systems.push(system);
            }
        }
    };

    const detachEntity = entity => {
        for (const system of entity.systems) {
            system.entities.remove(entity);
        }

        delete entity.systems;
    };

    const updateEntity = entity => {
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

    Object.assign(engine, { entities, systems, attachEntity, detachEntity, updateEntity });

    const update = time => {
        for (const system of systems) system.update(system.entities, time);
    };

    engine.updates.push(update);
};
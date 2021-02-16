const bind = (entity, system) => {
    if (system.validate(entity)) {
        system.entities.push(entity);
        entity.systems.push(system);
    }
};

export const initializeECS = engine => {
    const systems = new Set();
    const entities = new Set();
    return {
        attachSystem: system => {
            system.entities = [];
            for (const entity of entities) {
                bind(entity, system);
            }
        },
        detachSystem: system => {
            for (const entity of system.entities) {
                entity.systems.remove(system);
            }

            delete system.entities;
        },
        updateSystems: time => {
            for (const system of systems) {
                system.update?.(system.entities, time);
            }
        },
        attachEntity: entity => {
            entity.systems = [];
            for (const system of systems) {
                bind(entity, system);
            }
        },
        detatchEntity: entity => {
            for (const system of entity.systems) {
                system.entities.remove(entity);
            }

            delete entity.systems;
        },
        updateEntity: entity => {
            const systems = entitySystems.get(entity);
            for (const [system, entities] of systemEntities) {
                const valid = system.validate(entity);
                const exists = entities.has(entity);
                if (valid && !exists) {
                    system.add?.(entity);
                    entities.push(entity);
                    systems.push(system);
                } else if (!valid && exists) {
                    system.remove?.(entity);
                    entities.remove(entity);
                    systems.remove(system);
                }
            }
        }
    };
};
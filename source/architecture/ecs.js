export const initializeECS = () => {
    const systemEntities = new Map();
    const entitySystems = new Map();
    return {
        createSystem: system => {
            const entities = new Set();
            for (const [entity, systems] of entitySystems) {
                if (system.validate(entity)) {
                    entities.add(entity);
                    systems.add(system);
                }
            }

            systemEntities.set(system, entities);
        },
        deleteSystem: system => {
            for (const entity of systemEntities.remove(system)) {
                entitySystems.get(entity).delete(system);
            }
        },
        updateSystems: time => {
            for (const [system, entities] of systemEntities) {
                system.update(entities, time);
            }
        },
        createEntity: prototype => {
            const entity = { ...prototype };
            entitySystems.set(entity, new Set());
            return entity;
        },
        deleteEntity: entity => {
            for (const system of entitySystems.remove(entity)) {
                systemEntities.get(system).delete(entity);
            }
        },
        updateEntity: entity => {
            for (const [system, entities] of systemEntities) {
                if (system.validate(entity)) {
                    if (!entities.has(entity)) {
                        entitySystems.get(entity).add(system);
                        entities.add(entity);
                    }
                } else if (entities.has(entity)) {
                    entitySystems.get(entity).delete(system);
                    entities.delete(entity);
                }
            }
        }
    }
};
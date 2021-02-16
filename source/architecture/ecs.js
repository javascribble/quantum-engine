export const initializeECS = engine => {
    const systemEntities = new Map();
    const entitySystems = new Map();
    Object.assign(engine, {
        attachSystem: system => {
            const entities = [];
            for (const [entity, systems] of entitySystems) {
                if (system.validate(entity)) {
                    system.add?.(entity);
                    entities.push(entity);
                    systems.push(system);
                }
            }

            systemEntities.set(system, entities);
        },
        detachSystem: system => {
            for (const entity of systemEntities.remove(system)) {
                entitySystems.get(entity).remove(system);
                system.remove?.(entity);
            }
        },
        updateSystems: time => {
            for (const [system, entities] of systemEntities) {
                system.update?.(entities, time);
            }
        },
        attachEntity: entity => {
            const systems = [];
            for (const [system, entities] of systemEntities) {
                if (system.validate(entity)) {
                    system.add?.(entity);
                    entities.push(entity);
                    systems.push(system);
                }
            }

            entitySystems.set(entity, systems);
        },
        detachEntity: entity => {
            for (const system of entitySystems.remove(entity)) {
                systemEntities.get(system).remove(entity);
                system.remove?.(entity);
            }
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
    });
};
export const initializeECS = () => {
    const systemEntities = new Map();
    const entitySystems = new Map();
    return {
        attachSystem: system => {
            const entities = [];
            for (const [entity, systems] of entitySystems) {
                if (system.validate(entity)) {
                    system.construct?.(entity);
                    entities.push(entity);
                    systems.push(system);
                }
            }

            systemEntities.set(system, entities);
        },
        detachSystem: system => {
            for (const entity of systemEntities.remove(system)) {
                entitySystems.get(entity).remove(system);
                system.destruct?.(entity);
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
                    system.construct?.(entity);
                    entities.push(entity);
                    systems.push(system);
                }
            }

            entitySystems.set(entity, systems);
        },
        detachEntity: entity => {
            for (const system of entitySystems.remove(entity)) {
                systemEntities.get(system).remove(entity);
                system.destruct?.(entity);
            }
        },
        updateEntity: entity => {
            const systems = entitySystems.get(entity);
            for (const [system, entities] of systemEntities) {
                const valid = system.validate(entity);
                const exists = entities.has(entity);
                if (valid && !exists) {
                    system.construct?.(entity);
                    entities.push(entity);
                    systems.push(system);
                } else if (!valid && exists) {
                    system.destruct?.(entity);
                    entities.remove(entity);
                    systems.remove(system);
                }
            }
        }
    };
};
export const initializeECS = () => {
    const systemEntities = new Map();
    const entitySystems = new Map();
    return {
        attachSystem: system => {
            const entities = new Set();
            for (const [entity, systems] of entitySystems) {
                if (system.validate(entity)) {
                    system.construct?.(entity);
                    entities.add(entity);
                    systems.add(system);
                }
            }

            systemEntities.set(system, entities);
        },
        detachSystem: system => {
            for (const entity of systemEntities.remove(system)) {
                entitySystems.get(entity).delete(system);
                system.destruct?.(entity);
            }
        },
        updateSystems: state => {
            for (const [system, entities] of systemEntities) {
                system.update?.(entities, state);
            }
        },
        attachEntity: entity => {
            const systems = new Set();
            for (const [system, entities] of systemEntities) {
                if (system.validate(entity)) {
                    system.construct?.(entity);
                    entities.add(entity);
                    systems.add(system);
                }
            }

            entitySystems.set(entity, systems);
        },
        detachEntity: entity => {
            for (const system of entitySystems.remove(entity)) {
                systemEntities.get(system).delete(entity);
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
                    entities.add(entity);
                    systems.add(system);
                } else if (!valid && exists) {
                    system.destruct?.(entity);
                    entities.delete(entity);
                    systems.delete(system);
                }
            }
        }
    };
};
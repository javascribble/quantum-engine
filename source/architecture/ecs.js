export const initializeECS = () => {
    const systemEntities = new Map();
    const entitySystems = new Map();

    const createSystem = system => {
        const entities = new Set();
        for (const [entity, systems] of entitySystems) {
            if (system.validate(entity)) {
                system.construct?.(entity);
                entities.add(entity);
                systems.add(system);
            }
        }

        systemEntities.set(system, entities);
    };

    const deleteSystem = system => {
        for (const entity of systemEntities.remove(system)) {
            entitySystems.get(entity).delete(system);
            system.destruct?.(entity);
        }
    }

    const updateSystems = time => {
        for (const [system, entities] of systemEntities) {
            system.update?.(entities, time);
        }
    };

    const createEntity = entity => {
        for (const child of entity.children) {

        }

        const systems = new Set();
        for (const [system, entities] of systemEntities) {
            if (system.validate(entity)) {
                system.construct?.(entity);
                entities.add(entity);
                systems.add(system);
            }
        }

        entitySystems.set(entity, systems);
    };

    const deleteEntity = entity => {
        for (const system of entitySystems.remove(entity)) {
            systemEntities.get(system).delete(entity);
            system.destruct?.(entity);
        }
    };

    const updateEntity = entity => {
        for (const [system, entities] of systemEntities) {
            if (system.validate(entity)) {
                if (!entities.has(entity)) {
                    entitySystems.get(entity).add(system);
                    system.construct?.(entity);
                    entities.add(entity);
                }
            } else if (entities.has(entity)) {
                entitySystems.get(entity).delete(system);
                system.destruct?.(entity);
                entities.delete(entity);
            }
        }
    };

    return {
        createSystem,
        deleteSystem,
        updateSystems,
        createEntity,
        deleteEntity,
        updateEntity
    }
};
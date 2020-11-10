export const initializeECS = () => {
    const systems = [];
    const entities = [];
    const map = new Map();
    return {
        systems,
        entities,
        createEntity: async prototype => {
            const active = new Set();
            const inactive = new Set();
            const entity = { ...prototype };
            map.set(entity, { active, inactive });
            for (const system of systems) {
                if (system.validate(entity)) {
                    active.add(system);
                    await system.add(entity);
                } else {
                    inactive.add(system);
                }
            }

            return entity;
        },
        deleteEntity: async entity => {
            const { active } = map.remove(entity);
            for (const system of active) {
                await system.remove(entity);
            }
        },
        addComponent: async entity => {
            const { active, inactive } = map.get(entity);
            for (const system of inactive) {
                if (system.validate(entity)) {
                    await system.add(entity);
                    inactive.delete(system);
                    active.add(system);
                }
            }
        },
        removeComponent: async entity => {
            const { active, inactive } = map.get(entity);
            for (const system of active) {
                if (!system.validate(entity)) {
                    await system.remove(entity);
                    active.delete(system);
                    inactive.add(system);
                }
            }
        }
    }
};
export const systems = new Set();

export const createSystemHandler = (container) => {
    const active = new Set();
    const inactive = new Set(systems);
    return {
        addComponent: (entity, component) => {
            for (const system of inactive) {
                if (system.valid(entity, component)) {
                    inactive.delete(system);
                    active.add(system);
                    system.add(container.proxy);
                }
            }
        },
        deleteComponent: (entity, component) => {
            for (const system of active) {
                if (!system.valid(entity, component)) {
                    system.delete(container.proxy);
                    active.delete(system);
                    inactive.add(system);
                }
            }
        },
        deleteEntity: () => active.forEach(system => system.delete(container.proxy))
    };
};
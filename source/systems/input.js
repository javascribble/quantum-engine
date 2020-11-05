export const createInputSystem = async (api, state, options, createEntity, deleteEntity) => {
    const { broker } = state;
    const { applyKeySchema } = api;
    const { schemata, defaultSchemata } = options;

    // TODO: Add control for both independent keyboard and aggregate input.
    defaultSchemata?.forEach(index => {
        const { keys } = schemata[index];
        for (const key of keys) {
            key.handlers = Object.fromEntries(Object.entries(key.events).map(entry => [entry[0], event => broker.publish(entry[1], event)]))
        }

        applyKeySchema(keys);
    });

    return {
        update: (delta, elapsed) => {
        },
        validate: entity => {
        },
        add: entity => {
        },
        replace: entity => {
        },
        remove: entity => {
        }
    }
};
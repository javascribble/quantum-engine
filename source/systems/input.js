export const createInputSystem = (engine, options) => {
    const { broker } = engine;
    const { schemata, defaultSchemata } = options;

    defaultSchemata?.forEach(index => {
        const schema = schemata[index];
        engine.applyKeySchema({
            name: schema.name,
            handlers: Object.fromEntries(Object.entries(key.handlers).map(entry => [entry[0], event => broker.publish(entry[1], event)]))
        });
    });

    // TODO: Add control for both independent keyboard and aggregate input.
};
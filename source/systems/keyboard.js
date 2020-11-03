integrate(api) {
    const { broker, options } = api;
    const { schemata, defaultSchemata } = options;
    for (const schema of schemata) {
        this.schemata.set(schema.name, schema.keys.map(key => ({
            name: key.name,
            handlers: Object.fromEntries(Object.entries(key.handlers).map(entry => [entry[0], event => broker.publish(entry[1], event)]))
        })));
    }

    defaultSchemata?.forEach(index => this.activate(schemata[index].name));
    broker.subscribe('activateSchema', this.activate.bind(this));
    api.activateKeyboardSchema = this.activate.bind(this);

    // TODO: Add more control for both independent keyboard and aggregate input.
}

Object.fromEntries(Object.entries(events).map(entry => [entry[0], event => broker.publish(entry[1], event)]));
export default (engine) => {
    const root = {};

    const entities = new Set();
    engine.systems.set('node', entities);
};
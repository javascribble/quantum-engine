export default (engine) => {
    const root = {};

    const nodes = new Set();
    engine.systems.set('node', nodes);
};
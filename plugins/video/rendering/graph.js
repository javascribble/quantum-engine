export default (engine) => {
    const nodes = new Set();
    engine.systems.set('node', nodes);
};
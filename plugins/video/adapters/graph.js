export default (engine) => {
    const root = {};

    engine.systems.add({
        validate: (entity) => entity.parent,
        add: (entity) => {

        },
        delete: (entity) => {

        }
    });
};
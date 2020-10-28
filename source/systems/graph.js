export const createGraphSystem = () => ({
    add: entity => {
        const { parent } = entity;
        if (!parent.children) {
            parent.children = new Set();
        }

        parent.children.add(entity);
    },
    replace: entity => {
        entity.parent.children.delete(entity);
    },
    delete: entity => {
        entity.parent.children.delete(entity);
    }
});
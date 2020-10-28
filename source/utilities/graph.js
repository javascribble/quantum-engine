export const createEntityGraph = (entities, parent, createEntity) => {
    for (const { prototype, children } of entities) {
        const entity = createEntity({ ...prototype, parent });
        if (children) {
            createEntityGraph(children, entity, createEntity);
        }
    }
};

export const deleteEntityGraph = (parent, deleteEntity) => {
    if (parent.children) {
        for (const child of parent.children) {
            deleteEntityGraph(child, deleteEntity);
            deleteEntity(child);
        }
    }
};
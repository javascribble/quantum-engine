export const createEntityTree = (entities, parent, createEntity) => {
    for (const { prototype, children } of entities) {
        const entity = createEntity({ ...prototype, parent });
        if (children) {
            createEntityTree(children, entity, createEntity);
        }
    }
};

export const deleteEntityTree = (parent, deleteEntity) => {
    if (parent.children) {
        for (const child of parent.children) {
            deleteEntityTree(child, deleteEntity);
            deleteEntity(child);
        }
    }
};

export const renderEntityTree = (parent, delta, elapsed) => {
    if (parent.children) {
        for (const child of parent.children) {
            renderEntityTree(child, delta, elapsed);
            child.render();
        }
    }
};
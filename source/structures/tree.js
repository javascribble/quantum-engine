export const applyTreeAction = (parent, action) => {
    if (parent.children) {
        for (const child of parent.children) {
            applyTreeAction(child, action);
        }
    }

    action(parent);
};
export const applyDepthAction = async (parent, action, property) => {
    if (property in parent) {
        for (const dependent of parent[property]) {
            await action(dependent);
            await applyDepthAction(dependent, action);
        }
    }
};

export const applyReverseDepthAction = async (parent, action, property) => {
    if (property in parent) {
        for (const dependent of parent[property]) {
            await applyReverseDepthAction(dependent, action);
            await action(dependent);
        }
    }
};
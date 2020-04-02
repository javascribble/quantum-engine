const defaultSocketOptions = {
};

export const createSocketSystem = (socketOptions) => {
    const options = {
        ...defaultSocketOptions,
        ...socketOptions
    };

    return {
        update: (deltaTime) => {

        }
    };
};

import { updates } from "../../../engine/main";

const defaultSocketOptions = {
};

export const enableSocketSystem = (socketOptions) => {
    const options = {
        ...defaultSocketOptions,
        ...socketOptions
    };

    updates.add((deltaTime) => {

    });
};

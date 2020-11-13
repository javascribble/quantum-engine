import { initializeECS } from "./ecs.js";

export const initializeAPI = () => ({
    ...initializeECS()
});
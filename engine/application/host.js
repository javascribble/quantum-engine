import { getTimestamp } from './browser';

let previousTime = getTimestamp();
let frame = 0;

export const systems = [];

export const start = () => update(getTimestamp());

export const stop = () => cancelAnimationFrame(frame);

const update = (currentTime) => {
    let deltaTime = currentTime - previousTime;
    for (const system of systems) {
        system(deltaTime);
    }

    previousTime = currentTime;
    frame = requestAnimationFrame(update);
};

import { getTimestamp } from './browser';

let previousTime = getTimestamp();
let frame = 0;

export const updates = [];

export const start = () => run(getTimestamp());

export const stop = () => cancelAnimationFrame(frame);

const run = (currentTime) => {
    let deltaTime = currentTime - previousTime;
    for (const update of updates) {
        update(deltaTime);
    }

    previousTime = currentTime;
    frame = requestAnimationFrame(run);
};

let previousTime = performance.now();
let frame = 0;

export const systems = [];

export function start() {
    update(performance.now());
}

export function stop() {
    cancelAnimationFrame(frame);
}

function update(currentTime) {
    let deltaTime = currentTime - previousTime;
    for (const system of systems) {
        system(deltaTime);
    }

    previousTime = currentTime;
    frame = requestAnimationFrame(update);
}

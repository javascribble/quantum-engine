const timestamp = performance.now;

let previousTime = timestamp();
let frame = 0;

export const updates = [];
export const options = {
    timeScale: 1
};

const animateFrame = (currentTime) => {
    let deltaTime = (currentTime - previousTime) * options.timeScale;
    for (const update of updates) {
        update(deltaTime);
    }

    previousTime = currentTime;
    frame = requestAnimationFrame(animateFrame);
};

export const startAnimation = () => animateFrame(timestamp());

export const stopAnimation = () => cancelAnimationFrame(frame);

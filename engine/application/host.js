let previousTime = performance.now();
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

export const startAnimation = () => animateFrame(performance.now());

export const stopAnimation = () => cancelAnimationFrame(frame);

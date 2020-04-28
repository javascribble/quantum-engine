let previousTime = performance.now();
let frame = 0;

export const executables = new Set();
export const options = {
    timeScale: 1
};

const animateFrame = (currentTime) => {
    let deltaTime = (currentTime - previousTime) * options.timeScale;
    for (const executable of executables) {
        executable.execute(deltaTime);
    }

    previousTime = currentTime;
    frame = requestAnimationFrame(animateFrame);
};

export const startAnimation = () => animateFrame(performance.now());

export const stopAnimation = () => cancelAnimationFrame(frame);

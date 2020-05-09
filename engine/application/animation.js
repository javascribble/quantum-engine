let previousTime = performance.now();
let frame = 0;

export const animations = new Set();

const animateFrame = (currentTime) => {
    let deltaTime = (currentTime - previousTime);
    for (const animation of animations) {
        animation.animate(deltaTime);
    }

    previousTime = currentTime;
    frame = requestAnimationFrame(animateFrame);
};

export const startAnimation = () => animateFrame(performance.now());

export const stopAnimation = () => cancelAnimationFrame(frame);
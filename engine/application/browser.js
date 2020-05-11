let previousTime = performance.now();
let frame = 0;

export const animations = new Set();

const animate = (currentTime) => {
    let deltaTime = (currentTime - previousTime);
    for (const animation of animations) {
        animation.animate(deltaTime);
    }

    previousTime = currentTime;
    frame = requestAnimationFrame(animate);
};

export const startAnimation = () => animate(performance.now());

export const stopAnimation = () => cancelAnimationFrame(frame);
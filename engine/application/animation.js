import { publish } from './events.js';

let previousTime = performance.now();
let frame = 0;

export const animateEvent = 'animate';

const animate = (currentTime) => {
    publish(animateEvent, currentTime - previousTime);
    previousTime = currentTime;
    frame = requestAnimationFrame(animate);
};

export const startAnimation = () => animate(performance.now());

export const stopAnimation = () => cancelAnimationFrame(frame);
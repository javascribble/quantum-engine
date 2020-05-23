import { query } from '../utilities/elements.js';

export const enableScaling = (element) => {
    let scale = 1;
    const factor = 1.2;
    const viewport = query(root, '#viewport');
    viewport.addEventListener("wheel", (event) => {
        event.preventDefault();
        scale = Math.clamp(event.deltaY < 0 ? scale * factor : scale / factor, 0, 1);
        viewport.style.transform = `scale(${scale})`;
        viewport.style.transformOrigin = "50% 50% 0px";
    });
};
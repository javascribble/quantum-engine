// const enableScaling = (element, target, factor = 1.2) => {
//     let scale = 1;
//     const applyScale = event => {
//         target.style.transform = `scale(${scale = clamp(event.deltaY < 0 ? scale * factor : scale / factor, 0, 2)})`;
//         target.style.transformOrigin = "50% 50% 0px";
//     };

//     element.addEventListener('wheel', applyScale, { passive: true });
// };

import { Engine } from '../elements/engine.js';

Engine.prototype.adapt = function (api, options) {
};
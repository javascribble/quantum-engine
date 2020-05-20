import { template } from '../utilities/elements.js';
import { childObjectIcons, parentObjectIcons } from '../markup/icons.js';

const objectControls = (controlsTemplate) => `<span contenteditable></span><div>${controlsTemplate}</div>`;

const objectContainer = `<details><summary style="position: relative; outline: none; width: 0px;">&nbsp;</summary></details>`;

export const childObject = template(`<div class="menu">${objectControls(childObjectIcons)}</div>`);

export const parentObject = template(`<div class="menu" style="position: absolute; width: 100%;">${objectControls(parentObjectIcons)}</div>${objectContainer}`);
import { template } from '../../shared/utilities/elements.js';
import { childObjectIcons, parentObjectIcons } from './icons.js';
import { objectsIcons } from './icons.js';

const controls = (markup) => `<span contenteditable></span><div>${markup}</div>`;

const container = `<details><summary style="position: relative; outline: none; width: 0px;">&nbsp;</summary></details>`;

export const childObject = template(`<div selectable class="menu">${controls(childObjectIcons)}</div>`);

export const parentObject = template(`<div selectable class="menu" style="position: absolute; width: 100%;">${controls(parentObjectIcons)}</div>${container}`);

export const objectsTemplate = template(`
<div class="menu section">${objectsIcons}</div>
<div id="hierarchy"></div>
`);
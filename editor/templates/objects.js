import { template } from '../../shared/utilities/elements.js';
import { childObjectIcons, parentObjectIcons } from './icons.js';
import { objectsIcons } from './icons.js';

const controls = (markup) => `<span contenteditable></span><div>${markup}</div>`;

const container = `<details><summary style="position: relative; outline: none; width: 0px;">&nbsp;</summary></details>`;

export const childObject = template(`<div selectable class="menu">${controls(childObjectIcons)}</div>`);

export const parentObject = template(`<div selectable class="menu" style="position: absolute; width: 100%;">${controls(parentObjectIcons)}</div>${container}`);

export const objectsTemplate = template(`
<style>
    .menu {
        display: flex;
        justify-content: space-between;
    }

    .selection {
        background-color: var(--primary-highlight-color);
    }
</style>
<div class="menu">${objectsIcons}</div>
<div id="hierarchy"></div>
`);
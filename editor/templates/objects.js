import { template } from '../utilities/elements.js';

const childObjectControls = ``;

const parentObjectControls = `
    <span title="expand">&#8794;</span>
    <span title="collapse">&#8793;</span>
    ${childObjectControls}
`;

const objectControls = (controlsTemplate) => `<span contenteditable></span><div>${controlsTemplate}</div>`;

const objectContainer = `<details><summary style="position: relative; outline: none; width: 0px;">&nbsp;</summary></details>`;

export const childObject = template(`<div class="menu">${objectControls(childObjectControls)}</div>`);

export const parentObject = template(`<div class="menu" style="position: absolute; width: 100%;">${objectControls(parentObjectControls)}</div>${objectContainer}`);

export const objectPanel = `<div class="menu section"><span></span><span>&#43;&#215;</span></div>`;
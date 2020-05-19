import { template } from '../utilities/elements.js';

export const parentTemplate = template(`
<div style="position: absolute; width: 100%; display: flex; justify-content: space-between;">
    <span contenteditable></span>
    <span>&#43;&#215;</span>
</div>
<details>
    <summary style="position: relative; outline: none; width: 0px;">&nbsp;</summary>
</details>
`);

export const childTemplate = template(`
<div style="display: flex; justify-content: space-between;">
    <span contenteditable></span>
    <span>&#43;&#215;</span>
</div>
`);
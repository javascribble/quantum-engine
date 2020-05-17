import { template } from '../utilities/elements.js';

export const parentTemplate = template(`
<details>
    <summary></summary>
</details>
`);

export const childTemplate = template(`
<div style="padding-left: 1px;">
    &#65372;<span></span>
</div>
`);

export const orphanTemplate = template(`
<div style="padding-left: 17px;">
    <span></span>
</div>
`);
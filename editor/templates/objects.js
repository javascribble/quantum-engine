import { template } from '../utilities/elements.js';

export const parentTemplate = template(`
<details>
    <summary style="outline: none;"><input type="text" /></summary>
</details>
`);

export const childTemplate = template(`
<div>
    <input type="text" />
</div>
`);
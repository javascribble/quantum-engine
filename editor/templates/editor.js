import { template } from '../imports.js';

export const editor = template(`
<style>
    div {
    }
</style>
<div>
    <slot name="menu"></slot>
    <slot name="tabs"></slot>
</div>
`);
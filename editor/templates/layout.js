import { template } from '../../shared/utilities/elements.js';

export const layoutTemplate = template(`
<style>
</style>
<div>
    <slot name="header"></slot>
    <slot name="panel"></slot>
    <slot name="viewport"></slot>
    <slot name="panel"></slot>
    <slot name="footer"></slot>
</div>
`);
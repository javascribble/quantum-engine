import { template } from '../imports.js';

export const editor = template(`
<style> w-stack { display: flex; } </style>
<div>
    <w-stack>
        <div>test1</div>
        <div>test2</div>
    </w-stack>
    <hr />
    <w-tabs>
        <div slot="menu"></div>
        <div slot="tab" name="tab1">test1</div>
        <div slot="tab" name="tab2">test1</div>
    </w-tabs>
</div>
`);
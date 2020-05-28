import { template } from '@javascribble/quantum';

export const layout = template(`
<style>
    :host { 
        display: grid;
        grid-template-rows: min-content auto min-content;
        grid-template-columns: 50% 50%;
        overflow: hidden;
        height: 100%;
    }

    [name=center]::slotted(*) {
        grid-row: 2;
        grid-column: 1 / 3;
    }
    
    [name=widgets]::slotted(*) {
        visibility: hidden;
        position: absolute;
        z-index: 1;
    }

    [name=left]::slotted(*) {
        grid-column: 1;
    }

    [name=right]::slotted(*) {
        grid-column: 2;
        direction: rtl;
        justify-self: end;
    }

    [name=right]:after {
        direction: ltr;
    }

    .bar::slotted(*) {
        grid-column-start: span 2;
    }

    .panel::slotted(*) {
        white-space: nowrap;
        resize: horizontal;
        position: relative;
        max-width: 100%;
        overflow: auto;
        grid-row: 2;
        z-index: 1;
    }
</style>
<slot name="top" class="bar"></slot>
<slot name="left" class="panel"></slot>
<slot name="right" class="panel"></slot>
<slot name="bottom" class="bar"></slot>
<slot name="center"></slot>
<slot name="widgets"></slot>
`);
import { template } from '../utilities/elements.js';

export const editor = template(`
<style>
    .editor { 
        display: grid;
        grid-template-columns: auto 1fr auto;
        grid-template-rows: min-content auto min-content;
        background-color: var(--secondary-background-color);        
        height: 100%;
    }

    .viewport {
        border: 1px solid;
        justify-self: center;
        align-self: center;
        resize: both;
        overflow: auto;
        width: 300px;
        height: 300px;
    }

    .objects {
        grid-column: 1;
    }

    .properties {
        grid-column: 3;
    }

    .panel {
        background-color: var(--primary-background-color);        
        grid-row-start: 1;
        grid-row-end: 4;
        resize: horizontal;
        overflow: auto;
    }
</style>
<div class="editor">
    <div class="objects panel">
        <div>objects</div>
    </div>
    <div>top controls</div>
    <div class="viewport"><slot></slot></div>
    <div>bottom controls</div>    
    <div class="properties panel" style="direction: rtl;">
        <div style="direction: ltr;">properties</div>
    </div>
</div>
`);
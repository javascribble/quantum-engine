import { template } from '../utilities/elements.js';

export const editorTemplate = template(`
<style>
    #editor { 
        display: grid;
        grid-template-rows: min-content auto min-content;
        grid-template-columns: 50% 50%;
        overflow: hidden;
        height: 100%;
    }

    #engine {
        padding: 0 15px;
    }

    #viewport {
        box-shadow: 0px 0px 1px 1px var(--primary-highlight-color);
        justify-self: center;
        align-self: center;
        resize: both;
        overflow: hidden;
        max-width: calc(100% - 30px);
    }

    #menu {
    }

    #vitals {
    }

    #objects {
        grid-column: 1;
    }

    #properties {
        grid-column: 2;
        direction: rtl;
        justify-self: end;
    }

    #properties:after {
        direction: ltr;
    }

    .control {
        background-color: var(--primary-background-color);
        grid-column-start: span 2;
        padding: 0 5px;
    }

    .view {
        grid-row: 2;
        grid-column: 1 / 3;
    }

    .panel {
        background-color: var(--secondary-background-color);
        grid-row: 2;
        resize: horizontal;
        overflow: auto;
        max-width: 100%;
        z-index: 1;
    }
</style>
<div id="editor">
    <div id="menu" class="control">
        <span>
            <span>&#128427;</span>
            <span>&#128449;</span>
        </span>
        <span>
            <span>&#9654;</span>
            <span>&#10074;&#10074;</span>
            <span>&#9209;</span>
        </span>
    </div>
    <div id="engine" class="view"><slot></slot></div>
    <div id="viewport" class="view"></div>  
    <div id="objects" class="panel"></div>
    <div id="properties" class="panel"></div>
    <div id="vitals" class="control">
        <span>vitals</span>
    </div> 
</div>
`);
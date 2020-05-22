import { template } from '../../shared/utilities/elements.js';

export const layoutTemplate = template(`
<style>
    * {
        box-sizing: border-box;
        user-select: none;
    }

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
        justify-self: center;
        align-self: center;
        resize: both;
        overflow: hidden;
        max-width: calc(100% - 30px);
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

    #selection {
        position: absolute;
        z-index: 2;
    }

    .bar {
        grid-column-start: span 2;
    }

    .bar > div {
        padding: 0 15px 0 5px;
        resize: horizontal;
        overflow: auto;
        float: left;
    }

    .view {
        grid-row: 2;
        grid-column: 1 / 3;
    }

    .panel {
        white-space: nowrap;
        resize: horizontal;
        position: relative;
        max-width: 100%;
        overflow: auto;
        grid-row: 2;
        z-index: 1;
    }

    .menu {
        display: flex;
        justify-content: space-between;
    }

    .icon {

    }

    .icons {
        padding: 0 5px;
    }

    input {
        background-color: var(--secondary-background-color);
        font-family: inherit;
        font-size: inherit;
        border: none;
    }

    #header {
        background: linear-gradient(var(--secondary-background-color), var(--primary-background-color));
    }
    
    #footer {
        background: linear-gradient(var(--primary-background-color), var(--secondary-background-color));
    }    

    #viewport {
        box-shadow: 0px 0px 1px 1px var(--primary-highlight-color);
    }

    #selection {
        border: 1px dashed var(--primary-highlight-color);
    }

    .selection {
        background-color: var(--primary-highlight-color);
    }

    .section {
        border-bottom: 1px solid var(--primary-border-color);
    }

    .panel {
        background-color: var(--secondary-background-color);
    }    
</style>
<div id="editor">
    <slot id="header" name="header" class="bar"></slot>
    <game-objects id="objects"></game-objects>
    <slot id="engine" name="view" class="view"></slot>
    <div id="viewport" class="view"></div>
    <game-properties id="properties"></game-properties>
    <slot id="footer" name="footer" class="bar"></slot>
    <div id="selection" style="position: absolute; z-index: 1;"></div>
</div>
`);
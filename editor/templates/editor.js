import { template } from '../../shared/utilities/elements.js';
import { headerIcons, footerIcons } from './icons.js';

export const editorTemplate = template(`
<style>
    * {
        box-sizing: border-box;
        user-select: none;
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

    #selection {
        position: absolute;
        z-index: 2;
    }

    .bar > div {
        padding: 0 15px 0 5px;
        resize: horizontal;
        overflow: auto;
        float: left;
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
<editor-layout>
    <div id="header" slot="top" class="bar">${headerIcons}</div>
    <game-objects id="objects" slot="left" class="panel"></game-objects>
    <div id="engine" slot="center" class="view"><slot></slot></div>
    <div id="viewport" slot="center" class="view"></div> 
    <game-properties id="properties" slot="right" class="panel"></game-properties>
    <div id="footer" slot="bottom" class="bar">${footerIcons}</div>
    <div id="selection" slot="widgets"></div>
</editor-layout>
`);
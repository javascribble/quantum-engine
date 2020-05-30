import { template, repeat } from '@javascribble/quantum';
import { projectIcons, debugIcons, editorIcons, geometryIcons } from '../constants/icons.js';
import { isArray } from '../aliases/array.js';

const flatten = code => isArray(code) ? code.join(';&#') : code;

export const icon = (model) => `<span class="icon" title="${model.title}">&#${flatten(model.code)};</span>`;

export const icons = (models) => `<div class="icons">${repeat(icon, models, '&nbsp;')}</div>`;

export const headerIcons = repeat(icons, [projectIcons, debugIcons, editorIcons]);

export const footerIcons = repeat(icons, [geometryIcons]);

export const editor = template(`
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

    .panel {
        background-color: var(--secondary-background-color);
    }    
</style>
<layout-component>
    <div id="header" slot="top" class="bar">${headerIcons}</div>
    <tree-component selectable id="objects" slot="left" class="panel"></tree-component>
    <div id="engine" slot="center" class="view"><slot></slot></div>
    <div id="viewport" slot="center" class="view"></div>
    <div id="properties" slot="right" class="panel">properties</div>
    <div id="footer" slot="bottom" class="bar">${footerIcons}</div>
    <div id="selection" slot="widgets"></div>
</layout-component>
`);
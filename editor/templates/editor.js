import { template } from '../utilities/elements.js';
import { editorStyles } from '../styles/editor.js';
import { headerIcons, footerIcons } from './icons.js';
import { propertiesPanel } from './properties.js';
import { objectPanel } from './objects.js';
import { viewport } from './viewport.js';

export const editor = template(`
<style>${editorStyles}</style>
<div id="editor">
    <div id="header" class="menu bar">${headerIcons}</div>
    <div id="engine" class="view"><slot></slot></div>
    <div id="viewport" class="view">${viewport}</div>  
    <div id="objects" class="panel">${objectPanel}</div>
    <div id="properties" class="panel">${propertiesPanel}</div>
    <div id="footer" class="menu bar">${footerIcons}</div> 
</div>
`);
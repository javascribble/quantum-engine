import { template } from '../../shared/utilities/elements.js';
import { headerIcons, footerIcons } from '../markup/icons.js';
import { propertiesPanel } from '../markup/properties.js';
import { objectPanel } from '../markup/objects.js';
import { viewport } from '../markup/viewport.js';
import { widgets } from '../markup/widgets.js';
import { editorStyles } from '../styles/editor.js';

export const editor = template(`
<style>${editorStyles}</style>
<div id="editor">
    <div id="header" class="bar">${headerIcons}</div>
    <div id="engine" class="view"><slot></slot></div>
    <div id="viewport" class="view">${viewport}</div>  
    <div id="objects" class="panel">${objectPanel}</div>
    <div id="properties" class="panel">${propertiesPanel}</div>
    <div id="footer" class="bar">${footerIcons}</div>
    ${widgets}
</div>
`);
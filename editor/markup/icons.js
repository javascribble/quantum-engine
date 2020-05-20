import { projectIcons, debugIcons, editorIcons, geometryIcons, hierarchyIcons, editingIcons } from '../constants/icons.js';
import { joinMarkup } from '../utilities/markup.js';
import { isArray } from '../aliases/array.js';

const flatten = code => isArray(code) ? code.join(';&#') : code;

export const icon = (model) => `<span class="icon" title="${model.title}">&#${flatten(model.code)};</span>`;

export const icons = (models) => `<div class="icons">${joinMarkup(icon, models, '&nbsp;')}</div>`;

export const headerIcons = joinMarkup(icons, [projectIcons, debugIcons, editorIcons]);

export const footerIcons = joinMarkup(icons, [geometryIcons]);

export const childObjectIcons = joinMarkup(icons, []);

export const parentObjectIcons = joinMarkup(icons, [hierarchyIcons]);

export const objectsIcons = joinMarkup(icons, [editingIcons]);

export const propertiesIcons = joinMarkup(icons, []);
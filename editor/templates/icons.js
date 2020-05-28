import { repeat } from '@javascribble/quantum';
import { projectIcons, debugIcons, editorIcons, geometryIcons, hierarchyIcons, editingIcons } from '../constants/icons.js';
import { isArray } from '../aliases/array.js';

const flatten = code => isArray(code) ? code.join(';&#') : code;

export const icon = (model) => `<span class="icon" title="${model.title}">&#${flatten(model.code)};</span>`;

export const icons = (models) => `<div class="icons">${repeat(icon, models, '&nbsp;')}</div>`;

export const headerIcons = repeat(icons, [projectIcons, debugIcons, editorIcons]);

export const footerIcons = repeat(icons, [geometryIcons]);

export const childObjectIcons = repeat(icons, []);

export const parentObjectIcons = repeat(icons, [hierarchyIcons]);

export const objectsIcons = repeat(icons, [editingIcons]);

export const propertiesIcons = repeat(icons, []);
import { projectIcons, debugIcons, editorIcons, viewportIcons } from '../constants/icons.js';
import { joinTemplateModels } from '../utilities/templates.js';
import { isArray } from '../aliases/array.js';

const flatten = code => isArray(code) ? code.join(';&#') : code;

export const icon = (model) => `<span class="icon" title="${model.title}">&#${flatten(model.code)};</span>`;

export const icons = (models) => `<span class="icons">${joinTemplateModels(icon, models)}</span>`;

export const headerIcons = joinTemplateModels(icons, [projectIcons, debugIcons, editorIcons]);

export const footerIcons = joinTemplateModels(icons, [viewportIcons]);
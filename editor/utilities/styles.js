const visible = 'visible', hidden = 'hidden', selection = 'selection', active = 'active';

export const hide = style => style.visibility = hidden;

export const show = style => style.visibility = visible;

export const shown = style => style.visibility == visible;

export const toggleVisibility = style => style.visibility = visible(style) ? hidden : visible;

export const select = style => style.classList.add(selection);

export const deselect = style => style.classList.remove(selection);

export const selected = style => style.classList.contains(selection);

export const toggleSelection = style => selected(style) ? deselect(style) : select(style);

export const activate = style => style.classList.add(active);

export const deactivate = style => style.classList.remove(active);

export const activated = style => style.classList.contains(active);

export const toggleActive = style => activated(style) ? deactivate(style) : activate(style);

export const styleSheet = getComputedStyle(document.documentElement);
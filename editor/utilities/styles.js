const visible = 'visible', hidden = 'hidden', selection = 'selection', active = 'active';

export const show = element => element.style.visibility = visible;

export const hide = element => element.style.visibility = hidden;

export const shown = element => element.style.visibility == visible;

export const toggleVisibility = element => shown(element) ? hide(element) : show(element);

export const select = element => element.classList.add(selection);

export const deselect = element => element.classList.remove(selection);

export const selected = element => element.classList.contains(selection);

export const toggleSelection = element => selected(element) ? deselect(element) : select(element);

export const activate = element => element.classList.add(active);

export const deactivate = element => element.classList.remove(active);

export const activated = element => element.classList.contains(active);

export const toggleActive = element => activated(element) ? deactivate(element) : activate(element);

export const styleSheet = getComputedStyle(document.documentElement);
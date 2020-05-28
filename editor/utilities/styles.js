const visible = 'visible', hidden = 'hidden', selection = 'selection', active = 'active';

const addClass = (element, name) => element.classList.add(name);

const removeClass = (element, name) => element.classList.remove(name);

const hasClass = (element, name) => element.classList.contains(name);

const toggleClass = (element, name) => element.classList.toggle(name);

export const show = element => element.style.visibility = visible;

export const hide = element => element.style.visibility = hidden;

export const shown = element => element.style.visibility == visible;

export const toggleVisibility = element => shown(element) ? hide(element) : show(element);

export const select = element => addClass(element, selection);

export const deselect = element => removeClass(element, selection);

export const selected = element => hasClass(element, selection);

export const toggleSelection = element => toggleClass(element, selection);

export const activate = element => addClass(element, active);

export const deactivate = element => removeClass(element, active);

export const activated = element => hasClass(element, active);

export const toggleActive = element => toggleClass(element, active);
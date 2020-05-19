import { saveStyles, loadStyles } from '../storage/local.js';

const observables = new Map();

const resizeObserver = new ResizeObserver(entries => {
    for (const { target } of entries) {
        const observable = observables.get(target.id);
        if (observable.timeout) {
            clearTimeout(observable.timeout);
        }

        const update = () => { saveStyles(target, observable.properties); };
        observable.timeout = setTimeout(update, 1000);
    }
});

const observeElement = (root, selector, properties, defaults) => {
    const element = root.querySelector(selector);
    loadStyles(element, properties, defaults);
    observables.set(element.id, { properties });
    resizeObserver.observe(element);
};

export const syncLayout = (root) => {
    observeElement(root, '#objects', ['width'], ['300px']);
    observeElement(root, '#properties', ['width'], ['300px']);
    observeElement(root, '#viewport', ['width', 'height'], ['300px', '300px']);
};
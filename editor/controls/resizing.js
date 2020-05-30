import { query } from '@javascribble/quantum';
import { saveStyles, loadStyles } from '../application/storage.js';

const observables = new Map();

const resizeObserver = new ResizeObserver(entries => {
    for (const { target } of entries) {
        const observable = observables.get(target.id);
        if (observable.timeout) {
            clearTimeout(observable.timeout);
        }

        const update = () => saveStyles(target, observable.properties);
        observable.timeout = setTimeout(update, 1000);
    }
});

export const persistResize = (root, selector, properties, defaults) => {
    const element = query(root, selector);
    loadStyles(element, properties, defaults);
    observables.set(element.id, { properties });
    resizeObserver.observe(element);
};
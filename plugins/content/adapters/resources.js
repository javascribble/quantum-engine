export default (engine) => {
    engine.modules.add({
        start: (options) => {
            const resources = options.resources
            const urls = resources.locators.map(locator => locator.startsWith('/') ? locator : `${resources.path}/${locator}`);
            engine.extensions.loadResource = (index, loader, options) => engine.load(urls[index], loader, options);
            engine.extensions.loadResources = (indices, update, loader, options) => engine.loadMany(indices.map(index => urls[index]), update, loader, options);
        },
        stop: () => {
            engine.extensions.loadResource = null;
            engine.extensions.loadResources = null;
        }
    });
};
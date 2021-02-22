import { Engine } from '../elements/engine.js';

const { load, loaders } = quantum;

Engine.prototype.loadResource = function (index) {
    const { resources, resourceRoot } = this.options;
    return load(`${resourceRoot}/${resources[index]}`);
}

Engine.prototype.loadResources = function (indices) {
    return Promise.all(indices.map(this.loadResource.bind(this)));
}

loaders.png = (url, options) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(image);
    image.src = url;
});
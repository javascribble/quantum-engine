import { Engine } from '../elements/engine.js';

const { loaders } = quantum;

loaders.png = (url, options) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(image);
    image.src = url;
});

Engine.plugins.add(api => {
    api.attachSystem({
        validate: entity => 'image' in entity,
        update: (entities, time) => {
            for (const entity of entities) {
                api.drawSprite(entity);
            }
        }
    });
});
const { loaders } = quantum;

const loadImage = (url, options) => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(image);
    image.src = url;
});

loaders.png = loadImage;
loaders.jpg = loadImage;
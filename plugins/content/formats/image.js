export const loadImage = async (resource) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = resource;
    });
};

//const loadImageBitmap = (image, options) => createImageBitmap(image, options.x, options.y, options.w, options.h);
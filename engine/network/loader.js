export const loadBlob = (url) => fetch(url).then(response => response.blob());

export const loadJson = (url) => fetch(url).then(response => response.json());

export const loadText = (url) => fetch(url).then(response => response.text());

export const loadFormData = (url) => fetch(url).then(response => response.formData());

export const loadArrayBuffer = (url) => fetch(url).then(response => response.arrayBuffer());

export const loadImage = (url) => {
    // TODO: Change to use blob.
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.src = url;
    });
}
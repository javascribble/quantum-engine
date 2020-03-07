export function loadBlob(url) {
    return fetch(url).then(response => response.blob());
}

export function loadJson(url) {
    return fetch(url).then(response => response.json());
}

export function loadText(url) {
    return fetch(url).then(response => response.text());
}

export function loadFormData(url) {
    return fetch(url).then(response => response.formData());
}

export function loadArrayBuffer(url) {
    return fetch(url).then(response => response.arrayBuffer());
}

export function loadImage(url) {
    // TODO: Change to use blob.
    return new Promise(function (resolve, reject) {
        let image = new Image();
        image.onload = function () { resolve(image); };
        image.src = url;
    });
}
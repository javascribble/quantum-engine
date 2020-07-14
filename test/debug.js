const resources = [
    '/node_modules/@javascribble/quantum-canvas/source/templates/canvas.html',
    '/source/templates/engine.html'
];

Promise.all(resources.map(resource => fetch(resource).then(response => response.text().then(html => document.body.insertAdjacentHTML('beforeend', html)))));
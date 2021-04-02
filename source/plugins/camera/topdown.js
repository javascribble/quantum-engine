import { Engine } from '../../elements/engine.js';

const worldToScreen = (position, camera) => ({ x: position.x - camera.x, y: position.y - camera.y });

const screenToWorld = (position, camera) => ({ x: position.x + camera.x, y: position.y + camera.y });

const renderScene = (video, root, branches) => {
    if (root.image) {
        video.drawImage(root);
    }

    if (branches in root) {
        for (const branch of root[branches]) {
            renderScene(video, branch, branches);
        }
    }
};

const renderWorld = video => (world, camera) => {
    const { tilemap } = world;

    // TODO: Implement scene graph.

    renderScene(video, world, 'children');
};

Engine.plugins.add({
    load: engine => {
        engine.worldToScreen = worldToScreen;
        engine.screenToWorld = screenToWorld;
        engine.renderWorld = renderWorld(engine.video);
    },
    unload: engine => {
        delete engine.worldToScreen;
        delete engine.screenToWorld;
        delete engine.renderWorld;
    }
});
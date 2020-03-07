var engine = (function (exports) {
    'use strict';

    const userAgent = navigator.userAgent;
    const serviceWorker = navigator.serviceWorker;

    let previousTime = performance.now();
    let frame = 0;

    const systems = [];

    function start() {
        update(performance.now());
    }

    function stop() {
        cancelAnimationFrame(frame);
    }

    function update(currentTime) {
        let deltaTime = currentTime - previousTime;
        for (const system of systems) {
            system(deltaTime);
        }

        previousTime = currentTime;
        frame = requestAnimationFrame(update);
    }

    exports.serviceWorker = serviceWorker;
    exports.start = start;
    exports.stop = stop;
    exports.systems = systems;
    exports.userAgent = userAgent;

    return exports;

}({}));

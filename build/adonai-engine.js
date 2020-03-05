var engine = (function (exports) {
    'use strict';

    const navigator = window.navigator;
    const userAgent = navigator.userAgent;
    const serviceWorker = navigator.serviceWorker;
    const devicePixelRatio = window.devicePixelRatio;
    const addEventListener = window.addEventListener;
    const removeEventListener = window.removeEventListener;
    const localStorage = window.localStorage;

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

    exports.addEventListener = addEventListener;
    exports.devicePixelRatio = devicePixelRatio;
    exports.localStorage = localStorage;
    exports.navigator = navigator;
    exports.removeEventListener = removeEventListener;
    exports.serviceWorker = serviceWorker;
    exports.start = start;
    exports.stop = stop;
    exports.systems = systems;
    exports.userAgent = userAgent;

    return exports;

}({}));

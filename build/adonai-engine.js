var engine = (function (exports) {
    'use strict';

    const userAgent = navigator.userAgent;
    const serviceWorker = navigator.serviceWorker;

    const isTv = userAgent.match(/webOS/i);

    const isMobile =
        userAgent.match(/Android/i) ||
        userAgent.match(/iPhone/i) ||
        userAgent.match(/iPad/i) ||
        userAgent.match(/iPod/i) ||
        userAgent.match(/BlackBerry/i) ||
        userAgent.match(/Windows Phone/i);

    const events = new Map();

    function subscribe(topic, subscriber) {
        events.get(topic).add(subscriber);
    }

    function unsubscribe(topic, subscriber) {
        events.get(topic).delete(subscriber);
    }

    function publish(topic, value) {
        for (const subscriber of events.get(topic)) {
            subscriber(value);
        }
    }

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

    function generateNormalizedRandomNumber() {
        return Math.random() * 2 - 1;
    }

    function lastArrayElement(array) {
        return array[array.length - 1];
    }

    function insertArrayElement(array, element, index) {
        array.splice(index, 0, element);
    }

    function removeArrayElement(array, element) {
        array.splice(array.indexOf(element), 1);
    }

    const defaultGamepadControls = {
        UP: 'PAD_UP',
        DOWN: 'PAD_DOWN',
        LEFT: 'PAD_LEFT',
        RIGHT: 'PAD_RIGHT',
        ACTION1: 'PAD_FACE_1',
        ACTION2: 'PAD_FACE_2',
        ACTION3: 'PAD_FACE_3',
        ACTION4: 'PAD_FACE_4',
        SPECIAL1: 'PAD_L_SHOULDER_1',
        SPECIAL2: 'PAD_R_SHOULDER_1',
        SPECIAL3: 'PAD_L_SHOULDER_2',
        SPECIAL4: 'PAD_R_SHOULDER_2',
        SPECIAL5: 'PAD_L_STICK_BUTTON',
        SPECIAL6: 'PAD_R_STICK_BUTTON',
        SPECIAL7: 'PAD_VENDOR',
        ANALOG1: 'PAD_L_STICK_X',
        ANALOG2: 'PAD_L_STICK_Y',
        ANALOG3: 'PAD_R_STICK_X',
        ANALOG4: 'PAD_R_STICK_Y',
        SELECT: 'PAD_SELECT',
        START: 'PAD_START'
    };

    const gamepads = new Set(navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads());

    function enableGamepads() {
        addEventListener('ongamepadconnected', gamepadConnected);
        addEventListener('ongamepaddisconnected', gamepadDisconnected);

        systems.push(updateGamepads);
    }

    function updateGamepads(deltaTime) {
        for (const gamepad of gamepads) {
            //gamepad.buttons
            //gamepad.axes
            //publish
        }
    }

    function gamepadConnected(event) {
        gamepads.add(event.gamepad);
    }

    function gamepadDisconnected(event) {
        gamepads.delete(event.gamepad);
    }

    const defaultKeyboardControls = {
        UP: 'ArrowUp',
        DOWN: 'ArrowDown',
        LEFT: 'ArrowLeft',
        RIGHT: 'ArrowRight',
        ENTER: 'Enter'
    };

    function enableKeyboard() {
        addEventListener('keydown', keyboardKeyDown);
        addEventListener('keyup', keyboardKeyUp);
    }

    function keyboardKeyDown(event) {
        publish(event.code, event);
    }

    function keyboardKeyUp(event) {
        publish(event.code, event);
    }

    const defaultMouseControls = {
    };

    function enableMouse() {
        addEventListener('mousedown', mouseDown);
        addEventListener('mousemove', mouseMove);
        addEventListener('mouseup', mouseUp);
        addEventListener('mousewheel', mouseWheel);
        addEventListener('contextmenu', contextMenu);
    }

    function mouseDown(event) {
        // TODO: Use pointer lock API.
        //let canvas = event.target;
        //let center = canvas.center;
        //let bounds = canvas.getBoundingClientRect();
        //let x = (event.clientX - bounds.left - center.x) / center.x;
        //let y = (center.y - (event.clientY - bounds.top)) / center.y;
    }

    function mouseMove(event) {
    }

    function mouseUp(event) {
    }

    function mouseWheel(event) {

    }

    function contextMenu(event) {
        event.preventDefault();
    }

    const defaultTouchControls = {
    };

    function enableTouch() {
        addEventListener('touchstart', touchStart);
        addEventListener('touchmove', touchMove);
        addEventListener('touchend', touchEnd);
        addEventListener('touchcancel', touchCancel);
    }

    function touchStart(event) {
        //this.x = event.targetTouches[0].pageX - canvas.offsetLeft;
        //this.y = event.targetTouches[0].pageY - canvas.offsetTop;
    }

    function touchMove(event) {
    }

    function touchEnd(event) {
    }

    function touchCancel(event) {

    }

    function enableNetwork() {
        systems.push(updateNetwork);
    }

    function updateNetwork(deltaTime) {
        // TODO: Add web sockets.
    }

    function enableOfflineSupport() {
       addEventListener('online', onlineListener);
       addEventListener('offline', offlineListener);
    }

    function onlineListener() {

    }

    function offlineListener() {

    }

    function initialize2dPreset() {
        enableGamepads();
        enableKeyboard();
        enableMouse();
        enableTouch();
        enableNetwork();
        enableOfflineSupport();
    }

    function captureShallowObjectChanges(object) {
        return new Proxy(object, {
            set(target, property, value) {
                target.changed = true;
                target[property] = value;
                return true;
            }
        });
    }

    function createAssignPropertyTrap(handler) {
        return {
            set(target, property, value) {
                target[property] = value;
                handler(target, property, value);
                return true;
            }
        };
    }

    function createDefinePropertyTrap(handler) {
        return {
            defineProperty(target, property, descriptor) {
                Object.defineProperty(target, property, descriptor);
                handler(target, property);
                return true;
            },
        };
    }

    function createDeletePropertyTrap(handler) {
        return {
            deleteProperty(target, property) {
                handler(target, property);
                delete target[property];
            }
        };
    }

    function getOrAddMapValue(map, key, factory) {
        if (map.has(key)) {
            return map.get(key);
        } else {
            let value = factory();
            map.set(key, value);
            return value;
        }
    }

    const componentSystems = new Map();
    const componentObserver = {
        ...createAssignPropertyTrap(addEntityComponent),
        ...createDefinePropertyTrap(addEntityComponent),
        ...createDeletePropertyTrap(deleteEntityComponent)
    };

    function registerComponentSystem(component, system) {
        getOrAddMapValue(componentSystems, component, () => new Set()).add(system);
    }

    function createEntity() {
        return new Proxy({}, componentObserver);
    }

    function deleteEntity(entity) {
        for (const component in entity) {
            deleteComponent(entity, component);
        }
    }

    function addEntityComponent(entity, component) {
        for (const system of componentSystems.get(component)) {
            system.add(entity);
        }
    }

    function deleteEntityComponent(entity, component) {
        for (const system of componentSystems.get(component)) {
            system.delete(entity);
        }
    }

    function loadBlob(url) {
        return fetch(url).then(response => response.blob());
    }

    function loadJson(url) {
        return fetch(url).then(response => response.json());
    }

    function loadText(url) {
        return fetch(url).then(response => response.text());
    }

    function loadFormData(url) {
        return fetch(url).then(response => response.formData());
    }

    function loadArrayBuffer(url) {
        return fetch(url).then(response => response.arrayBuffer());
    }

    function loadImage(url) {
        // TODO: Change to use blob.
        return new Promise(function (resolve, reject) {
            let image = new Image();
            image.onload = function () { resolve(image); };
            image.src = url;
        });
    }

    const resourceOptions = {
        path: '/resources',
        extensions: {
            json: loadJson,
            png: loadImage,
            mtl: loadText,
            obj: loadText,
            glsl: loadText,
            bin: loadBlob
        }
    };

    function loadResource(file) {
        let extension = file.substring(file.lastIndexOf('.') + 1);
        return resourceOptions.extensions[extension](`${resourceOptions.path}/${file}`);
    }

    async function loadResources(resources, resourceLoader) {
        for (const resource in resources) {
            resources[resource] = await resourceLoader(resources[resource]);
        }
    }

    function saveLocalState(state) {
        for (const name in state) {
            state[name] = localStorage.getKey(name);
        }
    }

    function loadLocalState(state) {
        for (const name in state) {
            localStorage.setKey(name, state[name]);
        }
    }

    function clamp(number, min, max) {
        return number >= max ? max : number <= min ? min : number;
    }

    function lerp(min, max, ratio) {
        return min + (min - max) * ratio;
    }

    function defineObservedProperty(object, property, target, handler) {
        Object.defineProperty(object, property, {
            get: () => { return target[property]; },
            set: (value) => {
                handler(value, target[property]);
                target[property] = value;
            }
        });
    }

    function defineLinkedProperty(object, property, target) {
        Object.defineProperty(object, property, {
            get: () => { return target[property]; },
            set: (value) => { target[property] = value; }
        });
    }

    function removeNewLines(string) {
        return string.replace(/\n/g, '');
    }
    function firstSubstring(string, index) {
        return string.substring(0, index);
    }

    exports.captureShallowObjectChanges = captureShallowObjectChanges;
    exports.clamp = clamp;
    exports.createAssignPropertyTrap = createAssignPropertyTrap;
    exports.createDefinePropertyTrap = createDefinePropertyTrap;
    exports.createDeletePropertyTrap = createDeletePropertyTrap;
    exports.createEntity = createEntity;
    exports.defaultGamepadControls = defaultGamepadControls;
    exports.defaultKeyboardControls = defaultKeyboardControls;
    exports.defaultMouseControls = defaultMouseControls;
    exports.defaultTouchControls = defaultTouchControls;
    exports.defineLinkedProperty = defineLinkedProperty;
    exports.defineObservedProperty = defineObservedProperty;
    exports.deleteEntity = deleteEntity;
    exports.enableGamepads = enableGamepads;
    exports.enableKeyboard = enableKeyboard;
    exports.enableMouse = enableMouse;
    exports.enableNetwork = enableNetwork;
    exports.enableOfflineSupport = enableOfflineSupport;
    exports.enableTouch = enableTouch;
    exports.events = events;
    exports.firstSubstring = firstSubstring;
    exports.generateNormalizedRandomNumber = generateNormalizedRandomNumber;
    exports.getOrAddMapValue = getOrAddMapValue;
    exports.initialize2dPreset = initialize2dPreset;
    exports.insertArrayElement = insertArrayElement;
    exports.isMobile = isMobile;
    exports.isTv = isTv;
    exports.lastArrayElement = lastArrayElement;
    exports.lerp = lerp;
    exports.loadArrayBuffer = loadArrayBuffer;
    exports.loadBlob = loadBlob;
    exports.loadFormData = loadFormData;
    exports.loadImage = loadImage;
    exports.loadJson = loadJson;
    exports.loadLocalState = loadLocalState;
    exports.loadResource = loadResource;
    exports.loadResources = loadResources;
    exports.loadText = loadText;
    exports.publish = publish;
    exports.registerComponentSystem = registerComponentSystem;
    exports.removeArrayElement = removeArrayElement;
    exports.removeNewLines = removeNewLines;
    exports.resourceOptions = resourceOptions;
    exports.saveLocalState = saveLocalState;
    exports.serviceWorker = serviceWorker;
    exports.start = start;
    exports.stop = stop;
    exports.subscribe = subscribe;
    exports.systems = systems;
    exports.unsubscribe = unsubscribe;
    exports.userAgent = userAgent;

    return exports;

}({}));

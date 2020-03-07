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

    const entities = new Set();

    function registerTestSystem() {
        registerComponentSystem('node', entities);
        systems.push(updateTestSystem);
    }

    function updateTestSystem(deltaTime) {
        if (entities.size > 0) {
            console.log(entities.size);
            entities.clear();
        }
    }

    function registerSystems() {
        registerTestSystem();
        let entity = createEntity();
        entity.node = "test";
    }

    exports.createEntity = createEntity;
    exports.deleteEntity = deleteEntity;
    exports.registerComponentSystem = registerComponentSystem;
    exports.registerSystems = registerSystems;
    exports.serviceWorker = serviceWorker;
    exports.start = start;
    exports.stop = stop;
    exports.systems = systems;
    exports.userAgent = userAgent;

    return exports;

}({}));

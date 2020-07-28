import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    events = new Map();

    static template = quantum.template(html);

    publish(topic, value) {
        for (const subscriber of this.events.get(topic)) {
            subscriber(value);
        }
    }

    subscribe(topic, subscriber) {
        if (this.events.has(topic)) {
            this.events.get(topic).add(subscriber);
        } else {
            this.events.set(topic, new Set([subscriber]));
        }
    }

    unsubscribe(topic, subscriber) {
        this.events.get(topic).delete(subscriber);
    }
}

quantum.define('quantum-engine', Engine);
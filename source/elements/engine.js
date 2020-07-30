import html from '../templates/engine.js';

export class Engine extends quantum.Component {
    #events = new Map();

    static template = quantum.template(html);

    publish(topic, value) {
        if (this.#events.has(topic)) {
            for (const subscriber of this.#events.get(topic)) {
                subscriber(value);
            }
        }
    }

    subscribe(topic, subscriber) {
        if (this.#events.has(topic)) {
            this.#events.get(topic).add(subscriber);
        } else {
            this.#events.set(topic, new Set([subscriber]));
        }
    }

    unsubscribe(topic, subscriber) {
        if (this.#events.has(topic)) {
            const set = this.#events.get(topic);
            if (set.size === 1) {
                this.#events.delete(topic);
            } else {
                set.delete(subscriber);
            }
        }
    }
}

quantum.define('quantum-engine', Engine);
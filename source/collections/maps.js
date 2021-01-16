import { EventSet } from './sets.js';

export class EventMap extends Map {
    publish(topic, value) {
        this.get(topic)?.invoke(value);
    }

    subscribe(topic, subscriber) {
        if (this.has(topic)) {
            this.get(topic).add(subscriber);
        } else {
            this.set(topic, new EventSet([subscriber]));
        }
    }

    unsubscribe(topic, subscriber) {
        if (this.has(topic)) {
            const set = this.get(topic);
            if (set.size === 1) {
                this.delete(topic);
            } else {
                set.delete(subscriber);
            }
        }
    }
}

export class ObservableMap extends Map {
    set(key, value) {
        this.onSet?.(key, value);
        super.set(key, value);
    }

    delete(key) {
        this.onDelete?.(key);
        super.delete(key);
    }
}
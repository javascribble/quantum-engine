export const events = new Map();

export function subscribe(topic, subscriber) {
    events.get(topic).add(subscriber);
}

export function unsubscribe(topic, subscriber) {
    events.get(topic).delete(subscriber);
}

export function publish(topic, value) {
    for (const subscriber of events.get(topic)) {
        subscriber(value);
    }
}

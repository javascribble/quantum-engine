const events = new Map();

export const subscribe = (topic, subscriber) => {
    if (events.has(topic)) {
        events.get(topic).add(subscriber);
    } else {
        events.set(topic, new Set([subscriber]));
    }
};

export const unsubscribe = (topic, subscriber) => events.get(topic).delete(subscriber);

export const publish = (topic, value) => {
    if (events.has(topic)) {
        for (const subscriber of events.get(topic)) {
            subscriber(value);
        }
    }
};
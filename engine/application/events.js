const events = new Map();

export const subscribe = (topic, subscriber) => {
    let event = null;
    if (events.has(topic)) {
        event = events.get(topic);
    } else {
        event = new Set();
        events.set(topic, event);
    }

    event.add(subscriber);
};

export const unsubscribe = (topic, subscriber) => events.get(topic).delete(subscriber);

export const publish = (topic, value) => {
    for (const subscriber of events.get(topic)) {
        subscriber(value);
    }
};
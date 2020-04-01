export const events = {};

export const subscribe = (topic, subscriber) => events[topic].add(subscriber);

export const unsubscribe = (topic, subscriber) => events[topic].delete(subscriber);

export const publish = (topic, value) => {
    for (const subscriber of events[topic]) {
        subscriber(value);
    }
};

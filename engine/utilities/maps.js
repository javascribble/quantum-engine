export const tryExecuteMapValue = (map, key, command) => map.has(key) ? command(map.get(key)) || true : false;

export const getOrAddMapValue = (map, key, factory) => {
    if (map.has(key)) {
        return map.get(key);
    } else {
        const value = factory();
        map.set(key, value);
        return value;
    }
};
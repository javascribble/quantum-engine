export const getMapValueWithDefault = (map, key, factory) => {
    if (map.has(key)) {
        return map.get(key);
    } else {
        const value = factory();
        map.set(key, value);
        return value;
    }
}

import { entries } from './objects';

export const copyObjectToMap = (map, object) => {
    for (const [property, value] of entries(object)) {
        map.set(property, value);
    }
}

export const getMapValueWithDefault = (map, key, factory) => {
    if (map.has(key)) {
        return map.get(key);
    } else {
        const value = factory();
        map.set(key, value);
        return value;
    }
}

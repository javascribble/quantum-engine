export class Mobius {
    constructor(map1, map2) {
        this.map1 = map1;
        this.map2 = map2;
    }

    add(element) {
        const keys = new Set();
        for (const [key, values] of this.map2) {
            if (key.validate(element)) {
                values.add(element);
                keys.add(key);
            }
        }

        this.map1.set(element, keys);
    }

    delete(element) {
        for (const keys of this.map1.get(element)) {
            keys.delete(element);
        }

        this.map1.delete(element);
    }
}
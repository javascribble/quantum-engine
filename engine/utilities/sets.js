export const curryAdd = (value) => (set) => set.add(value);

export const curryDelete = (value) => (set) => set.delete(value);

export const moveSetValue = (value, source, target) => {
    source.delete(value);
    target.add(value);
};
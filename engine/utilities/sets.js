export const curryAddSetValues = (set) => (value) => set.add(value);

export const curryAddSetsValue = (value) => (set) => set.add(value);

export const curryDeleteSetValues = (set) => (value) => set.delete(value);

export const curryDeleteSetsValue = (value) => (set) => set.delete(value);
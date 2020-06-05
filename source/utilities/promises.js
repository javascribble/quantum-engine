import { all } from '@javascribble/quantum';

export const trackPromises = (promises, update) => {
    const progress = { completed: 0, total: promises.length };
    update(progress);

    const trackPromise = async (promise) => {
        const result = await promise;
        progress.completed++;
        update(progress);
        return result;
    };

    return all(promises.map(trackPromise));
};
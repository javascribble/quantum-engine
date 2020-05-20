import { storedActions } from '../constants/storage.js';

const past = [];
const future = [];

export const act = (invoke, reverse) => {
    past.push({ invoke, reverse });
    if (past.length > storedActions) {
        past.shift();
    }

    if (future.length > 0) {
        future = [];
    }

    invoke();
};

export const undo = () => {
    if (past.length > 0) {
        const action = past.pop();
        action.reverse();
        future.push(action);
    }
};

export const redo = () => {
    if (future.length > 0) {
        const action = future.pop();
        action.invoke();
        past.push(action);
    }
};
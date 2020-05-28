import { query } from '@javascribble/quantum';
import { enableSelection } from '../input/selection.js';

export const configureServices = (root) => {
    enableSelection(root, query(root, '#selection'));
};
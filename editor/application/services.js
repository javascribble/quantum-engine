import { enableSelection } from '../input/selection.js';
import { query } from '../utilities/elements.js';

export const configureServices = (root) => {
    enableSelection(root, query(root, '#selection'));
};
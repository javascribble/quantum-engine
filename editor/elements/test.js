import Element, { define } from '../application/element';
import test from '../markup/test';

define('editable-list', class extends Element {
    constructor() {
        super(() => test('test'));
    }
});
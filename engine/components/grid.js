import { Component } from '../extensions/component.js';
import { define, template } from '../utilities/elements.js';

export default class GridComponent extends Component {
    constructor() {
        super();
    }
}

define('grid', GridComponent);
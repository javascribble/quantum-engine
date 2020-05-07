import { Component } from '../extensions/component.js';
import { define } from '../utilities/elements.js';

export class GridComponent extends Component {
    constructor() {
        super();
    }
}

define('grid', GridComponent);
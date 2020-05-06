import { Component } from '../extensions/component.js';
import { define } from '../utilities/elements.js';

export default class GridComponent extends Component {
    constructor() {
        super();
    }
}

define('grid', GridComponent);
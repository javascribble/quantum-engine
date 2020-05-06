import { Component } from '../extensions/component.js';
import { define } from '../utilities/elements.js';

export default class DockComponent extends Component {
    constructor() {
        super();
    }
}

define('dock', DockComponent);
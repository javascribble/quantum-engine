import { Component } from '../extensions/component.js';
import { define, template } from '../utilities/elements.js';

export default class DockComponent extends Component {
    constructor() {
        super();
    }
}

define('dock', DockComponent);
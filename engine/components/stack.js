import { Component } from '../extensions/component.js';
import { define } from '../utilities/elements.js';

export default class StackComponent extends Component {
    constructor() {
        super();
    }
}

define('stack', StackComponent);
import { Component } from '../extensions/component.js';
import { define, clone } from '../utilities/elements.js';
import { stack } from '../templates/stack.js';

export class Stack extends Component {
    constructor() {
        super();

        this.appendChild(clone(stack));
    }
}

define('stack', Stack);
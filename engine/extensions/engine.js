import { start, stop } from '../application/session.js';
import { define } from '../application/components.js';
import { Component } from './component.js';

export class Engine extends Component {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'closed' });
        //shadow.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return [...super.observedAttributes, 'src'];
    }

    set src(value) {

    }

    connectedCallback() {
    }

    disconnectedCallback() {
    }
}

define('engine', Engine);
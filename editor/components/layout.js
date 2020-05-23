import { shadow, clone } from '../../shared/utilities/elements.js';
import { layoutTemplate } from '../templates/layout.js';
import { Component } from '../extensions/component.js';

export class Layout extends Component {
    constructor() {
        super();

        const root = shadow(this);
        root.appendChild(clone(layoutTemplate));
    }
}
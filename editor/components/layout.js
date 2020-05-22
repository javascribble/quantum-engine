import { layoutTemplate } from '../templates/layout.js';
import { Component } from '../extensions/component.js';

export class Layout extends Component {
    constructor() {
        super(layoutTemplate);
    }
}
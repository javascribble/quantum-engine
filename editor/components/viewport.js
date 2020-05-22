import { viewportTemplate } from '../templates/viewport.js';
import { Component } from '../extensions/component.js';

export class Viewport extends Component {
    constructor() {
        super(viewportTemplate);
    }
}
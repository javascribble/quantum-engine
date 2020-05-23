import { shadow, clone } from '../../shared/utilities/elements.js';
import { propertiesTemplate } from '../templates/properties.js';
import { Component } from '../extensions/component.js';

export class Properties extends Component {
    constructor() {
        super();

        shadow(this).appendChild(clone(propertiesTemplate));
    }
}
import { define } from '../../shared/utilities/elements.js';
import { propertiesTemplate } from '../templates/properties.js';
import { observeStyle } from '../application/layout.js';
import { Component } from '../elements/component.js';

export class Properties extends Component {
    constructor() {
        super(propertiesTemplate);
    }
}

define('game-properties', Properties);
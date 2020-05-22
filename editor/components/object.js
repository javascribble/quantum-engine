import { clone, define } from '../../shared/utilities/elements.js';
import { Component } from '../elements/component.js';

export class Object extends Component {
    constructor() {
        super();
    }
}

define('game-object', Object);
import { objectTemplate } from '../templates/object.js';
import { Component } from '../extensions/component.js';

export class Object extends Component {
    constructor() {
        super(objectTemplate);
    }
}
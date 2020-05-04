import Component from '../abstractions/component.js';
import { defineElement } from '../application/components.js';
import { createTemplate } from '../utilities/templates.js';

const template = createTemplate(`<slot name="content" />`);

export default class StackComponent extends Component {
    constructor() {
        super(template);
    }
}

defineElement('stack', StackComponent);
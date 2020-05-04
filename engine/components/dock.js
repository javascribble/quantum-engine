import Component from '../abstractions/component.js';
import { defineElement } from '../application/components.js';
import { createTemplate } from '../utilities/templates.js';

const template = createTemplate(`<slot name="content" />`);

export default class DockComponent extends Component {
    constructor() {
        super(template);
    }
}

defineElement('dock', DockComponent);
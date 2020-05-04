import Component from '../extensions/component.js';
import { defineElement } from '../application/components.js';
import { createTemplate } from '../utilities/templates.js';

const template = createTemplate(`<slot name="content" />`);

export default class GridComponent extends Component {
    constructor() {
        super(template);
    }
}

defineElement('grid', GridComponent);
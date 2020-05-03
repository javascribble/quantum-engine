import Component from '../abstractions/component.js';
import { define } from '../../../engine/utilities/elements.js';
import { createTemplate } from '../utilities/templates.js';

const template = createTemplate(`<slot name="content" />`);

export default class DockComponent extends Component {
    constructor() {
        super(template);
    }
}

define('dock', DockComponent);
import Component from '../abstractions/component.js';
import { define } from '../../../engine/utilities/elements.js';

const template = createTemplate(`<slot name="content" />`);

export default class StackComponent extends Component {
    constructor() {
        super(template);
    }
}

define('stack', StackComponent);
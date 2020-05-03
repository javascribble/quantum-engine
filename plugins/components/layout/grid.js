import Component from '../extensions/component.js';
import { define } from '../../../engine/utilities/elements.js';

const template = createTemplate(`<slot name="content" />`);

export default class GridComponent extends Component {
    constructor() {
        super(template);
    }
}

define('grid', GridComponent);
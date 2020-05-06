import { Component } from '../extensions/component.js';
import { define, template } from '../utilities/elements.js';

const template = template(tabs);

export default class TabsComponent extends Component {
    constructor() {
        super(template);
    }
}

define('tabs', TabsComponent);
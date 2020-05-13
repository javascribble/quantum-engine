import { template } from '../utilities/elements.js';

export const editor = template(`
<style>
    .group { position: relative; width: 100%; height: 100%; }
    .tab > a { text-decoration: none; float: left; height: 30px; padding: 0px 10px; }
    .tab > div { display: none; position: absolute; left: 0; top: 30px; bottom: 0; right: 0; }	
    .tab > .active { display: block; }
</style>

<div class="group">
    <div class="tab" id="tab1">
        <a href="#tab1">Tab 1</a>
        <div class="active"><slot></slot></div>
    </div>
    <div class="tab" id="tab2">
        <a href="#tab2">Tab 2</a>
        <div>b</div>
    </div>
    <div class="tab" id="tab3">
        <a href="#tab3">Tab 3</a>
        <div>c</div>
    </div>
</div>
`);
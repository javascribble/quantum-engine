import { template } from '../imports.js';

export const editor = template(`
<style>
    div {
    }
</style>
<script>
function drag(event) {
  console.log(event);
}
</script>
<div>
    <w-tabs>
        <div slot="menu"></div>
        <div slot="tab" name="tab1">test1</div>
        <div slot="tab" name="tab2">test1</div>
    </w-tabs>
</div>
`);
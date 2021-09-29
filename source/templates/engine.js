export default `
<style>
    :host {
        position: relative;
        display: block;
    }

    ::slotted([resource]) {
        display: none;
    }
</style>
<slot></slot>
`;
export const layoutStyles = `
    #editor { 
        display: grid;
        grid-template-rows: min-content auto min-content;
        grid-template-columns: 50% 50%;
        overflow: hidden;
        height: 100%;
    }

    #engine {
        padding: 0 15px;
    }

    #viewport {
        justify-self: center;
        align-self: center;
        resize: both;
        overflow: hidden;
        max-width: calc(100% - 30px);
    }

    #objects {
        grid-column: 1;
    }

    #properties {
        grid-column: 2;
        direction: rtl;
        justify-self: end;
    }

    #properties:after {
        direction: ltr;
    }

    #selection {
        position: absolute;
        z-index: 2;
    }

    .bar {
        grid-column-start: span 2;
    }

    .bar > div {
        padding: 0 15px 0 5px;
        resize: horizontal;
        overflow: auto;
        float: left;
    }

    .view {
        grid-row: 2;
        grid-column: 1 / 3;
    }

    .panel {
        white-space: nowrap;
        resize: horizontal;
        position: relative;
        max-width: 100%;
        overflow: auto;
        grid-row: 2;
        z-index: 1;
    }

    .menu {
        display: flex;
        justify-content: space-between;
    }
`;
export const editorStyles = `
    #editor { 
        display: grid;
        grid-template-rows: min-content auto min-content;
        grid-template-columns: 50% 50%;
        overflow: hidden;
        height: 100%;
    }

    #editor * {
        user-select: none;
    }

    #engine {
        padding: 0 15px;
    }

    #viewport {
        box-shadow: 0px 0px 1px 1px var(--primary-highlight-color);
        justify-self: center;
        align-self: center;
        resize: both;
        overflow: hidden;
        max-width: calc(100% - 30px);
    }

    #header {
        background: linear-gradient(var(--secondary-background-color), var(--primary-background-color));
    }
    
    #footer {
        background: linear-gradient(var(--primary-background-color), var(--secondary-background-color));
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
        border: 1px dashed var(--primary-highlight-color); 
        z-index: 2;
    }

    .menu {
        display: flex;
        justify-content: space-between;
    }

    .bar {
        grid-column-start: span 2;
        padding: 0 5px;
    }

    .view {
        grid-row: 2;
        grid-column: 1 / 3;
    }

    .panel {
        background-color: var(--secondary-background-color);
        white-space: nowrap;
        resize: horizontal;
        position: relative;
        max-width: 100%;
        overflow: auto;
        grid-row: 2;
        z-index: 1;
    }

    .selected {
        background-color: var(--primary-highlight-color);
    }

    .section {
        border-bottom: 1px solid var(--primary-border-color);
    }

    input {
        background-color: var(--secondary-background-color);
        font-family: inherit;
        font-size: inherit;
        border: none;
    }
`;
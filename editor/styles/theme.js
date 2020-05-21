export const themeStyles = `
    #header {
        background: linear-gradient(var(--secondary-background-color), var(--primary-background-color));
    }
    
    #footer {
        background: linear-gradient(var(--primary-background-color), var(--secondary-background-color));
    }    

    #viewport {
        box-shadow: 0px 0px 1px 1px var(--primary-highlight-color);
    }

    #selection {
        border: 1px dashed var(--primary-highlight-color);
    }

    .selection {
        background-color: var(--primary-highlight-color);
    }

    .section {
        border-bottom: 1px solid var(--primary-border-color);
    }

    .panel {
        background-color: var(--secondary-background-color);
    }
`;
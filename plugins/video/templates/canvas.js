import { template } from '@javascribble/quantum';

const markup = '<canvas></canvas>';

const style = `
    canvas {
        display: block;
        width: 100%;
        height: 100%;
    }
`;

export const canvas = template(markup, style);
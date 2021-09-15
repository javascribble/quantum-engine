import { html } from '../adapters/html.js';
import { input } from '../adapters/input.js';
import { video } from '../adapters/video.js';
import { animation } from '../plugins/animation.js';
import { architecture } from '../plugins/architecture.js';
import { prototypes } from '../plugins/prototypes.js';
import { resources } from '../plugins/resources.js';

export const adapters = {
    html,
    input,
    video
};

export const plugins = {
    animation,
    architecture,
    prototypes,
    resources
};
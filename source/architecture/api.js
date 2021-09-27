import { HtmlAdapter } from '../adapters/html.js';
import { InputAdapter } from '../adapters/input.js';
import { VideoAdapter } from '../adapters/video.js';
import { AnimationPlugin } from '../plugins/animation.js';
import { ArchitecturePlugin } from '../plugins/architecture.js';
import { PrototypePlugin } from '../plugins/prototype.js';
import { ResourcePlugin } from '../plugins/resource.js';

export const createAdapters = () => new Map([
    ['html', new HtmlAdapter()],
    ['input', new InputAdapter()],
    ['video', new VideoAdapter()]
]);

export const createPlugins = () => new Map([
    ['animation', new AnimationPlugin()],
    ['architecture', new ArchitecturePlugin()],
    ['resources', new ResourcePlugin()],
    ['prototypes', new PrototypePlugin()]
]);

export const createBridge = (adapters, plugins) => Object.fromEntries([...adapters, ...plugins].map(([key, value]) => [key, value.bridge]));
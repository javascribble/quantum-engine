import { HtmlAdapter } from '../adapters/html.js';
import { InputAdapter } from '../adapters/input.js';
import { VideoAdapter } from '../adapters/video.js';
import { AnimationPlugin } from '../plugins/animation.js';
import { ArchitecturePlugin } from '../plugins/architecture.js';
import { PrototypePlugin } from '../plugins/prototype.js';
import { ResourcePlugin } from '../plugins/resource.js';
import { SourcePlugin } from '../plugins/source.js';
import { StatePlugin } from '../plugins/state.js';

export const extensions = quantum.extensions = new Map([
    ['source', engine => new SourcePlugin(engine)],
    ['html', engine => new HtmlAdapter(engine)],
    ['input', engine => new InputAdapter(engine)],
    ['video', engine => new VideoAdapter(engine)],
    ['animation', engine => new AnimationPlugin(engine)],
    ['architecture', engine => new ArchitecturePlugin(engine)],
    ['resource', engine => new ResourcePlugin(engine)],
    ['prototype', engine => new PrototypePlugin(engine)],
    ['state', engine => new StatePlugin(engine)]
]);
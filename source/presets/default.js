import { HtmlAdapter } from '../adapters/html.js';
import { InputAdapter } from '../adapters/input.js';
import { VideoAdapter } from '../adapters/video.js';
import { AnimationPlugin } from '../plugins/animation.js';
import { ArchitecturePlugin } from '../plugins/architecture.js';
import { PrototypePlugin } from '../plugins/prototype.js';
import { ResourcePlugin } from '../plugins/resource.js';
import { SourcePlugin } from '../plugins/source.js';
import { StatePlugin } from '../plugins/state.js';
import { Engine } from '../elements/engine.js';

Engine.extensions.set('source', SourcePlugin);
Engine.extensions.set('html', HtmlAdapter);
Engine.extensions.set('input', InputAdapter);
Engine.extensions.set('video', VideoAdapter);
Engine.extensions.set('animation', AnimationPlugin);
Engine.extensions.set('architecture', ArchitecturePlugin);
Engine.extensions.set('resource', ResourcePlugin);
Engine.extensions.set('prototype', PrototypePlugin);
Engine.extensions.set('state', StatePlugin);
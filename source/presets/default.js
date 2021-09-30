import { HtmlAdapter } from '../adapters/html.js';
import { InputAdapter } from '../adapters/input.js';
import { VideoAdapter } from '../adapters/video.js';
import { AnimationPlugin } from '../plugins/animation.js';
import { ArchitecturePlugin } from '../plugins/architecture.js';
import { PrototypePlugin } from '../plugins/prototype.js';
import { ResourcePlugin } from '../plugins/resource.js';
import { SourcePlugin } from '../plugins/source.js';
import { StatePlugin } from '../plugins/state.js';

import { extensions } from '../architecture/api.js';

extensions.set('source', engine => new SourcePlugin(engine));
extensions.set('html', engine => new HtmlAdapter(engine));
extensions.set('input', engine => new InputAdapter(engine));
extensions.set('video', engine => new VideoAdapter(engine));
extensions.set('animation', engine => new AnimationPlugin(engine));
extensions.set('architecture', engine => new ArchitecturePlugin(engine));
extensions.set('resource', engine => new ResourcePlugin(engine));
extensions.set('prototype', engine => new PrototypePlugin(engine));
extensions.set('state', engine => new StatePlugin(engine));
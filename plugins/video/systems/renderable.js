import { meshComponent } from '../components/mesh';
import { materialComponent } from '../components/material';
//import { getGPUShaderStageConstant, getGPUColorWriteConstant } from '../../webgpu/graphics/constants';

const defaultRenderableOptions = {
};

export const createRenderableSystem = async (renderableOptions) => {
    const options = {
        ...defaultRenderableOptions,
        ...renderableOptions
    };

    const device = options.device;

    return {
        components: [meshComponent, materialComponent],
        add: (entity) => {
        },
        delete: (entity) => {
        },
        update: (deltaTime) => {
        }
    }
};

// const loadLayout = async (resource) => {
//     const layoutResource = await load(resource);

//     for (const binding of layoutResource.bindings) {
//         binding.visibility = getGPUShaderStageConstant(binding.visibility);
//     }

//     return layoutResource;
// };

// const loadProgram = async (resource) => {
//     const programResource = await load(resource);

//     for (const colorState of programResource.colorStates) {
//         colorState.writeMask = getGPUColorWriteConstant(colorState.writeMask);
//     }

//     return programResource;
// };

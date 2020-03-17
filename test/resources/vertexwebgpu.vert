#version 450

layout (location = 0) uniform mat3 projectionView;
layout (location = 1) in mat3 modelTransform;
layout (location = 2) in vec2 vertexPosition; 
layout (location = 3) in vec2 vertexCoordinate; 
layout (location = 0) out vec2 fragmentCoordinate; 

void main() { 
    gl_Position = vec4((projectionView * modelTransform * vec3(vertexPosition, 1)).xy, 0, 1);

    fragmentCoordinate = vertexCoordinate;
}
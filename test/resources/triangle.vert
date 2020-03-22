#version 450

layout(location=0) in vec2 vertexCoordinate; 
layout(location=1) in vec2 vertexPosition; 
layout(location=2) in vec3 modelTransforma;
layout(location=3) in vec3 modelTransformb;
layout(location=4) in vec3 modelTransformc;
layout(location=0) out vec2 fragmentCoordinate; 

layout(set=0, binding=0) uniform Uniforms {
	mat3 projectionView;
};

void main() 
{
    fragmentCoordinate = vertexCoordinate;
	
	gl_Position = vec4((mat3(0.02, 0, 0, 0, 0.02, 0, -1, -1, 0) * mat3(1, 0, 0, 0, 1, 0, 10, 10, 1) * vec3(vertexPosition, 1)).xy , 0, 1);
}
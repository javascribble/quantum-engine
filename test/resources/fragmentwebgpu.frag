#version 450

layout (location = 0) uniform sampler2D sampler0;
layout (location = 0) out vec2 fragmentCoordinate;

void main() {
    gl_FragColor = texture2D(sampler0, fragmentCoordinate);
}
#version 300 es

precision highp float;

out vec4 fragColor;

void main() 
{   
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard; 
    fragColor = vec4(0.5, 0.0, 1.0, 1.0);
}
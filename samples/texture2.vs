uniform float time;

varying vec2 textureCoordinate;

void main()
{
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
	textureCoordinate = uv + vec2(time, time);
}

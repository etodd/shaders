varying vec3 varyingNormal;

void main()
{
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
	vec4 tmp = modelMatrix * vec4(normal, 0);
	varyingNormal = tmp.xyz;
}

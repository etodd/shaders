varying vec3 varyingNormal;

void main()
{
	gl_PointSize = 2.0;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
	varyingNormal = (modelMatrix * vec4(normal, 0)).xyz;
}

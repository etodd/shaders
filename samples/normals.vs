uniform float time;
void main()
{
	gl_PointSize = 2.0;
	vec3 p = position + normal * sin(time);
	gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1);
}

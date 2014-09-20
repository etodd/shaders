uniform float time;
void main()
{
	gl_PointSize = 2.0;
	vec3 p = position;
	p.y += sin(time) * 5.0;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1);
}

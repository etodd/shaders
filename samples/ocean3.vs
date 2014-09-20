uniform float time;

attribute float offset;

void main()
{
	gl_PointSize = 2.0;
	vec3 p = position;
	p.y += sin(time + offset) * 5.0;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1);
}

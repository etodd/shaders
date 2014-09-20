void main()
{
	gl_PointSize = 2.0;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
}

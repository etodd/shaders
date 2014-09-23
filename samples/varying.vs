attribute vec3 vertexColor;

varying vec3 varyingColor;

void main()
{
	gl_PointSize = 2.0;
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
	varyingColor = vertexColor;
}

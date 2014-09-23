var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 500;

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(80, -80, 0));
geometry.vertices.push(new THREE.Vector3(0, 80, 0));
geometry.vertices.push(new THREE.Vector3(-80, -80, 0));
geometry.faces.push(new THREE.Face3(0, 1, 2));
geometry.faceVertexUvs[0] = [];
geometry.faceVertexUvs[0].push(
[
	new THREE.Vector2(1, 0),
	new THREE.Vector2(0.5, 1),
	new THREE.Vector2(0, 0),
]);

var uniforms =
{
	texture1: { type: 't', value: THREE.ImageUtils.loadTexture('texture.jpg') },
};

var scene = new THREE.Scene();
var mat = new THREE.ShaderMaterial(
{
	vertexShader: document.getElementById('vs').textContent,
	fragmentShader: document.getElementById('ps').textContent,
	uniforms: uniforms,
});
var cloud = new THREE.Mesh(geometry, mat);
scene.add(cloud);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
document.body.appendChild(renderer.domElement);

function render()
{
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();

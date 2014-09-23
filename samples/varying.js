var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 10;

var scene = new THREE.Scene();

var attributes =
{
	vertexColor: { type: 'v3', value: [] },
};

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(0, 2.0, 0));
attributes.vertexColor.value.push(new THREE.Vector3(1, 0, 0));
geometry.vertices.push(new THREE.Vector3(-2.0, -2.0, 0));
attributes.vertexColor.value.push(new THREE.Vector3(0, 1, 0));
geometry.vertices.push(new THREE.Vector3(2.0, -2.0, 0));
attributes.vertexColor.value.push(new THREE.Vector3(0, 0, 1));
geometry.faces.push(new THREE.Face3(0, 1, 2));

var material = new THREE.ShaderMaterial(
{
	vertexShader: document.getElementById('vs').textContent,
	fragmentShader: document.getElementById('ps').textContent,
	attributes: attributes,
});

var cloud = new THREE.Mesh(geometry, material);
scene.add(cloud);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
document.body.appendChild(renderer.domElement);

var clock = new THREE.Clock();

function render()
{
	requestAnimationFrame(render);
	renderer.render(scene, camera);
}
render();

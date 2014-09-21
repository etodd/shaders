var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 500;

var scene = new THREE.Scene();

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-80, -80, -80));
geometry.vertices.push(new THREE.Vector3(-80, 80, -80));
geometry.vertices.push(new THREE.Vector3(80, -80, -80));
geometry.vertices.push(new THREE.Vector3(80, 80, -80));
geometry.vertices.push(new THREE.Vector3(-80, -80, 80));
geometry.vertices.push(new THREE.Vector3(-80, 80, 80));
geometry.vertices.push(new THREE.Vector3(80, -80, 80));
geometry.vertices.push(new THREE.Vector3(80, 80, 80));

var material = new THREE.ShaderMaterial(
{
	vertexShader: document.getElementById('vs').textContent,
});

var cloud = new THREE.PointCloud(geometry, material);
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

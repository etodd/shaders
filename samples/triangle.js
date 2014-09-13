var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 1000);
camera.position.z = 1;

var geometry = new THREE.Geometry(); // proxy for a vbo
geometry.vertices.push(new THREE.Vector3(0, 0.8, 0));
geometry.vertices.push(new THREE.Vector3(-0.8, -0.8, 0));
geometry.vertices.push(new THREE.Vector3(0.8, -0.8, 0));

var scene = new THREE.Scene();
var mat = new THREE.PointCloudMaterial({ size: 0.05, color: 0xff0000 });
scene.add(new THREE.PointCloud(geometry, mat));

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1); // hex color format
renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
document.body.appendChild(renderer.domElement);

function render()
{
	requestAnimationFrame(render); // set up draw loop
	renderer.render(scene, camera);
}
render();

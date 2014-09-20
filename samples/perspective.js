var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 500;

var geometry = new THREE.Geometry(); // proxy for a vbo
geometry.vertices.push(new THREE.Vector3(0, 80, 10));
geometry.vertices.push(new THREE.Vector3(-80, -80, 10));
geometry.vertices.push(new THREE.Vector3(80, -80, 10));

var scene = new THREE.Scene();
var mat = new THREE.PointCloudMaterial({ size: 10, color: 0xff0000, sizeAttenuation: false });
var cloud = new THREE.PointCloud(geometry, mat);
cloud.matrixAutoUpdate = false;
scene.add(cloud);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1); // hex color format
renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
document.body.appendChild(renderer.domElement);

window.matrix = new THREE.Matrix4();

var lastDet = 0;
function render()
{
	requestAnimationFrame(render); // continue the draw loop
	cloud.matrix.copy(window.matrix);
	cloud.updateMatrixWorld(true);
	renderer.render(scene, camera);
}
render();

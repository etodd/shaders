var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1000, 1000);

var geometry = new THREE.Geometry(); // proxy for a vbo
geometry.vertices.push(new THREE.Vector3(0, 0.8, 0));
geometry.vertices.push(new THREE.Vector3(-0.8, -0.8, 0));
geometry.vertices.push(new THREE.Vector3(0.8, -0.8, 0));

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

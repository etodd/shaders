var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 150;
camera.position.y = 20;

var scene = new THREE.Scene();

var attributes =
{
	offset: { type: 'f', value: [] },
};

var geometry = new THREE.Geometry();
for (var x = -50; x < 50; x++)
{
	for (var z = -50; z < 50; z++)
	{
		geometry.vertices.push(new THREE.Vector3(x, 0, z));
		attributes.offset.value.push((x + z) * 0.1);
	}
}

var uniforms =
{
	time: { type: 'f', value: 0 }, // f for float
};

var material = new THREE.ShaderMaterial(
{
	vertexShader: document.getElementById('vs').textContent,
	color: 0xff0000,
	uniforms: uniforms,
	attributes: attributes,
});

var cloud = new THREE.PointCloud(geometry, material);
scene.add(cloud);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff, 1);
renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
document.body.appendChild(renderer.domElement);

var clock = new THREE.Clock();

function render()
{
	requestAnimationFrame(render);
	uniforms.time.value = clock.getElapsedTime();
	renderer.render(scene, camera);
}
render();

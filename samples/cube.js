var camera, scene, renderer;

var uniforms;

init();
animate();

function init()
{
	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 500;

	scene = new THREE.Scene();

	uniforms =
	{
	};

	var geometry = new THREE.Geometry(); // proxy for a vbo
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
		uniforms: uniforms,
		vertexShader: document.getElementById('vs').textContent,
		fragmentShader: document.getElementById('ps').textContent,
		size: 10,
		color: 0xff0000,
		sizeAttenuation: false,
	});

	var cloud = new THREE.PointCloud(geometry, material);
	scene.add(cloud);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
	document.body.appendChild(renderer.domElement);
}

function animate()
{
	requestAnimationFrame(animate);

	render();
}

function render()
{
	renderer.render(scene, camera);
}

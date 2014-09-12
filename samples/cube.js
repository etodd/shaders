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

	var material = new THREE.ShaderMaterial(
	{
		uniforms: uniforms,
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent,
	});

	var mesh = new THREE.Mesh(new THREE.BoxGeometry(200, 200, 200), material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
	document.getElementById('container').appendChild(renderer.domElement);
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

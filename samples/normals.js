var loader = new THREE.JSONLoader(); // init the loader util

// init loading
loader.load('bunny.js', function(geometry)
{
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 25;

	var scene = new THREE.Scene();

	var uniforms =
	{
		time: { type: 'f', value: 0 }, // f for float
	};

	var material = new THREE.ShaderMaterial(
	{
		vertexShader: document.getElementById('vs').textContent,
		color: 0xff0000,
		uniforms: uniforms,
	});

	var cloud = new THREE.PointCloud(geometry, material);
	cloud.add(new THREE.VertexNormalsHelper(cloud));
	scene.add(cloud);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
	document.body.appendChild(renderer.domElement);

	var clock = new THREE.Clock();

	function render()
	{
		requestAnimationFrame(render);
		uniforms.time.value = cloud.rotation.y = clock.getElapsedTime();
		renderer.render(scene, camera);
	}
	render();
});

var loader = new THREE.JSONLoader(); // init the loader util

// init loading
loader.load('bunny.js', function(geometry)
{
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	var uniforms =
	{
		lightDirection: { type: 'v3', value: new THREE.Vector3(1, 0, 0) },
	};

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 20;

	var scene = new THREE.Scene();

	var lineGeometry = new THREE.Geometry();
	lineGeometry.vertices.push(new THREE.Vector3(5, 0, 0));
	lineGeometry.vertices.push(new THREE.Vector3(10, 0, 0));

	var light = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: 0xffffff, linewidth: 4 }));
	scene.add(light);

	material = new THREE.ShaderMaterial(
	{
		vertexShader: document.getElementById('vs').textContent,
		fragmentShader: document.getElementById('ps').textContent,
		uniforms: uniforms,
	});

	var cloud = new THREE.Mesh(geometry, material);
	scene.add(cloud);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
	document.body.appendChild(renderer.domElement);

	document.body.addEventListener('mousemove', function(event)
	{
		light.rotation.y = event.clientX * -3 * 3.1415 / 500.0;
		light.rotation.x = event.clientY * 3 * 3.1415 / 500.0;
	});

	var clock = new THREE.Clock();

	function render()
	{
		requestAnimationFrame(render);
		cloud.rotation.y = clock.getElapsedTime();
		var lightDirection = new THREE.Vector3(1, 0, 0);
		lightDirection.applyMatrix4(light.matrix);
		uniforms.lightDirection.value = lightDirection;
		renderer.render(scene, camera);
	}
	render();
});

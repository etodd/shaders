var loader = new THREE.JSONLoader(); // init the loader util

// init loading
loader.load('bunny.js', function(geometry)
{
	geometry.computeFaceNormals();
	geometry.computeVertexNormals();

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
	camera.position.z = 20;

	var scene = new THREE.Scene();

	var uniforms =
	{
        texture1: { type: 't', value: 0, texture: THREE.ImageUtils.loadTexture('texture.jpg') },
    };

	var material = new THREE.ShaderMaterial(
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

	var clock = new THREE.Clock();

	function render()
	{
		requestAnimationFrame(render);
		cloud.rotation.y = clock.getElapsedTime();
		renderer.render(scene, camera);
	}
	render();
});

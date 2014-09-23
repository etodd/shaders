var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 200;

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-80, -80, 0));
geometry.vertices.push(new THREE.Vector3(80, -80, 0));
geometry.vertices.push(new THREE.Vector3(0, 80, 0));
geometry.faces.push(new THREE.Face3(0, 1, 2));
geometry.faceVertexUvs[0] = [];
geometry.faceVertexUvs[0].push(
[
	new THREE.Vector2(0, 0),
	new THREE.Vector2(1, 0),
	new THREE.Vector2(0.5, 1),
]);

var label = document.createElement('span');
label.style.position = 'absolute';
label.style.zIndex = 1;
label.style.backgroundColor = '#000';
label.innerHTML = 'a';
label.style.bottom = 16 + 'px';
label.style.left = 16 + 'px';
document.body.appendChild(label);

label = document.createElement('span');
label.style.position = 'absolute';
label.style.zIndex = 1;
label.style.backgroundColor = '#000';
label.innerHTML = 'b';
label.style.bottom = 16 + 'px';
label.style.right = 16 + 'px';
document.body.appendChild(label);

label = document.createElement('span');
label.style.position = 'absolute';
label.style.zIndex = 1;
label.style.backgroundColor = '#000';
label.innerHTML = 'c';
label.style.top = 16 + 'px';
label.style.left = ((window.innerWidth / 2) - 8) + 'px';
document.body.appendChild(label);

var uniforms =
{
	texture1: { type: 't', value: THREE.ImageUtils.loadTexture('texture.jpg') },
	time: { type: 'f', value: 0 },
};
uniforms.texture1.value.wrapS = uniforms.texture1.value.wrapT = THREE.RepeatWrapping;

var scene = new THREE.Scene();
var mat = new THREE.ShaderMaterial(
{
	vertexShader: document.getElementById('vs').textContent,
	fragmentShader: document.getElementById('ps').textContent,
	uniforms: uniforms,
});
var cloud = new THREE.Mesh(geometry, mat);
scene.add(cloud);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
document.body.appendChild(renderer.domElement);

window.uvs = geometry.faceVertexUvs[0][0];

var clock = new THREE.Clock();

function render()
{
	requestAnimationFrame(render);
	geometry.uvsNeedUpdate = true;
	uniforms.time.value = clock.getElapsedTime();
	renderer.render(scene, camera);
}
render();

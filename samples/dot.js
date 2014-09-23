var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 5;

var label = document.createElement('span');
label.style.position = 'absolute';
label.style.zIndex = 1;
label.style.backgroundColor = '#000';
label.style.top = 16 + 'px';
label.style.right = 16 + 'px';
document.body.appendChild(label);

var scene = new THREE.Scene();
var mat = new THREE.PointCloudMaterial({ size: 0.2 });
scene.add(new THREE.PointCloud(new THREE.BoxGeometry(2, 2, 2), mat));

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(0, 0, 0));
geometry.vertices.push(new THREE.Vector3(1, 0, 0));

mat = new THREE.LineBasicMaterial( { color: 0xffffff, linewidth: 4 } );
var line1 = new THREE.Line(geometry, mat);
scene.add(line1);

mat = new THREE.LineBasicMaterial( { color: 0xff0000, linewidth: 4 } );
var line2 = new THREE.Line(geometry, mat);
line2.rotation.z = 0.25 * 3.1415;
scene.add(line2);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
document.body.appendChild(renderer.domElement);

var mouseDown = false;
document.body.addEventListener('mousedown', function()
{
	mouseDown = true;
	event.preventDefault();
	return false;
});
document.body.addEventListener('mouseup', function()
{
	mouseDown = false;
});

var lastMouseX = 0, lastMouseY = 0;
var cameraX = 0;
document.body.addEventListener('mousemove', function(event)
{
	var diffX, diffY;
	diffX = (event.clientY - lastMouseY) * 3 * 3.1415 / 500.0;
	diffY = (event.clientX - lastMouseX) * -3 * 3.1415 / 500.0;
	if (mouseDown)
	{
		line2.rotation.x += diffX;
		line2.rotation.z += diffY;
	}
	else
	{
		cameraX += diffY;
		camera.position.x = Math.sin(cameraX) * 5;
		camera.position.z = Math.cos(cameraX) * 5;
		camera.lookAt(new THREE.Vector3(0, 0, 0));
	}
	lastMouseX = event.clientX;
	lastMouseY = event.clientY;
});

function render()
{
	requestAnimationFrame(render); // continue the draw loop
	var normal = new THREE.Vector3(1, 0, 0);
	var normal2 = normal.clone();
	normal2.applyMatrix4(line2.matrix);
	label.innerHTML = (Math.round(normal.dot(normal2) * 100) / 100).toString();
	renderer.render(scene, camera);
}
render();

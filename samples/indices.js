var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 500;

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-80, -80, -80));
geometry.vertices.push(new THREE.Vector3(-80, 80, -80));
geometry.vertices.push(new THREE.Vector3(80, -80, -80));
geometry.vertices.push(new THREE.Vector3(80, 80, -80));
geometry.vertices.push(new THREE.Vector3(-80, -80, 80));
geometry.vertices.push(new THREE.Vector3(-80, 80, 80));
geometry.vertices.push(new THREE.Vector3(80, -80, 80));
geometry.vertices.push(new THREE.Vector3(80, 80, 80));

var scene = new THREE.Scene();
var cloudMat = new THREE.PointCloudMaterial({ size: 10, sizeAttenuation: false });
var cloud = new THREE.PointCloud(geometry, cloudMat);
scene.add(cloud);

geometry = geometry.clone();
geometry.dynamic = true;

// Pre-allocate 64 faces
var maxFaces = 64;
for (var i = 0; i < maxFaces; i++)
	geometry.faces.push(new THREE.Face3(0, 0, 0));

cloud.add(new THREE.Mesh(geometry, new THREE.MeshBasicMaterial()));

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth - 4, window.innerHeight - 4);
document.body.appendChild(renderer.domElement);

window.indices = [0, 1, 2];

var clock = new THREE.Clock();
function render()
{
	requestAnimationFrame(render);
	var face = [];
	var faceIndex = 0;
	for (var i = 0; i < Math.min(maxFaces * 3, window.indices.length); i++)
	{
		face.push(parseInt(window.indices[i]));
		if (face.length == 3)
		{
			var geometryFace = geometry.faces[faceIndex];
			geometryFace.a = face[0];
			geometryFace.b = face[1];
			geometryFace.c = face[2];
			face.length = 0;
			faceIndex++;
		}
	}
	for (var i = faceIndex; i < geometry.faces.length; i++)
	{
		var geometryFace = geometry.faces[faceIndex];
		geometryFace.a = 0;
		geometryFace.b = 0;
		geometryFace.c = 0;
	}
	geometry.elementsNeedUpdate = true;
	geometry.verticesNeedUpdate = true;
	cloud.rotation.y = clock.getElapsedTime();
	renderer.render(scene, camera);
}
render();

// Import the necessary Three.js components
import * as THREE from '/node_modules/three/build/three.module.js';
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from '/node_modules/three/examples/jsm/controls/OrbitControls.js';

// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create geometries and materials for the cubes
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0x000000 }));

const cube = new THREE.Mesh(geometry, material);
cube.position.set(5, 0, 0);
scene.add(cube);
scene.add(line);
line.position.copy(cube.position);

const geometry1 = new THREE.BoxGeometry(1, 1, 1);
const material1 = new THREE.MeshBasicMaterial({ color: 0x028192 });
const cube1 = new THREE.Mesh(geometry1, material1);
cube1.position.set(-5, 0, 0);
scene.add(cube1);

// Load a 3D object
function load(path, n, pos) {
  var rocks = [];
  rocks.push(new THREE.Object3D());
  const loader = new GLTFLoader();
  loader.load(path, function (gltf) {
    var rock = gltf.scene;
    rock.position.set(pos[0], pos[1], pos[2]);
    pos[0]++;
    pos[1]--;
    pos[2]++;
    rock.scale.set(1, 1, 1);
    scene.add(gltf.scene);
  },
    undefined,
    function (error) { console.error(error); });
}

const garden = "/addons/garden/garden.glb";
var test = load(garden, 1, [0, -3, -3]);

// Add a light source to the scene
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Set camera position
camera.position.z = 5;

// Enable WebXR (VR) functionality with the VRButton (already imported in HTML)
document.body.appendChild(VRButton.createButton(renderer));

// Initialize OrbitControls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Enables smooth controls
controls.dampingFactor = 0.25; // Smoothness of the damping
controls.screenSpacePanning = false; // Prevents moving up/down with the camera

// Animation loop
function animate() {
  // Rotate and move the cubes and wireframe
  line.rotation.x += 0.01;
  line.rotation.y += 0.01;
  line.position.x -= 0.01;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.position.x -= 0.01;
  cube1.position.x += 0.05;

  // Update the controls to apply user interaction
  controls.update(); // Only required if controls.enableDamping = true or if controls.enableZoom = true

  // Render the scene using the camera
  renderer.render(scene, camera);
}

// Start the animation loop
renderer.setAnimationLoop(animate);

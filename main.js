// Import the necessary Three.js components
import * as THREE from 'three';

// to be able to load a sspecific type of object, you have to import a loader
import { GLTFLoader } from '/node_modules/three/examples/jsm/loaders/GLTFLoader.js';

//import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.171.0/examples/jsm/loaders/GLTFLoader.js';

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

//trying to load a rock <- theo

function load(path, n, pos){
  var rocks = [];
  rocks.push(new THREE.Object3D());
  const loader = new GLTFLoader(); 
    loader.load( path, function ( gltf ) { 
    var rock = gltf.scene
    rock.position.set(pos[0],pos[1],pos[2]);
    pos[0]++
    pos[1]--
    pos[2]++
    rock.scale.set(1,1,1);
    scene.add(gltf.scene);
    //gltf.animations; //could be added here???
  },
   undefined,
    function ( error ) { console.error( error ); } ); //if error loading the rock
/* 

  rocks.forEach(rock => {
    const loader = new GLTFLoader(); 
    loader.load( path, function ( gltf ) { 
    rock = gltf.scene
    rock.position.set(pos[0],pos[1],pos[2]);
    pos[0]++
    pos[1]--
    pos[2]++
    rock.scale.set(0.009,0.009,0.009);
    scene.add(gltf.scene);
    //gltf.animations; //could be added here???
  },
   undefined,
    function ( error ) { console.error( error ); } ); //if error loading the rock
  });*/
}

//const tree = '/addons/tree2/maple_tree/scene.gltf';
const garden = "/addons/garden/garden.glb"
var test = load(garden, 1, [0,-3,-3]);

// Add a light source to the scene
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

// Set camera position
camera.position.z = 5;

// Enable WebXR (VR) functionality with the VRButton (already imported in HTML)
document.body.appendChild(VRButton.createButton(renderer));

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

    //rock.position.x += 0.01;
    //rock.position.y += 0.01;
    //rock.rotation.x += 0.001;

    // Check for collision and change color
    if (cube1.position.x > cube.position.x) {
        console.log("CRASH");
        cube.material.color.setHSL(1, 0.5, 0.5);
    }

    // Render the scene using the camera
    renderer.render(scene, camera);
}

// Start the animation loop
renderer.setAnimationLoop(animate);

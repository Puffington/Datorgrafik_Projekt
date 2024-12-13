//import * as THREE from 'three'; 

import * as THREE from '/node_modules/three/build/three.module.js';

const scene = new THREE.Scene(); 
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const renderer = new THREE.WebGLRenderer(); renderer.setSize( window.innerWidth, window.innerHeight ); 
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

const wireframe = new THREE.WireframeGeometry(geometry);
const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0x000000 }));

const cube = new THREE.Mesh( geometry, material );

cube.position.set(5,0,0)
scene.add(cube);
scene.add(line);
line.position.copy(cube.position);


const geometry1 = new THREE.BoxGeometry( 1, 1, 1 );
const material1 = new THREE.MeshBasicMaterial( { color:0x028192});
const cube1 = new THREE.Mesh( geometry1, material1 );
cube1.position.set(-5,0,0)
scene.add(cube1); 


const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light)

camera.position.z = 5;


function animate() { 

  line.rotation.x += 0.01;
  line.rotation.y += 0.01;
  line.position.x -= 0.01;

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.position.x -= 0.01;
  cube1.position.x += 0.05;
  if(cube1.position.x > cube.position.x){
    console.log("CRASH")
    cube.material.color.setHSL((1), 0.5, 0.5);
  }


  renderer.render( scene, camera ); 
} 
renderer.setAnimationLoop( animate );

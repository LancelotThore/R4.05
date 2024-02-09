import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Pour créer l’affichage en haut à droite
const container = document.getElementById('container');
const stats = new Stats();
container.appendChild(stats.dom);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.CubeTextureLoader()
	.setPath( 'assets/' )
	.load( [
                'posx.jpg',
				'negx.jpg',
                'posy.jpg',
                'negy.jpg',
                'posz.jpg',
                'negz.jpg'
			] );

// an array of objects whose rotation to update
const objects = [];

// plane
const planeGeometry = new THREE.PlaneGeometry( 25, 25, 32, 32 );
const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xFFBBAC, side: THREE.DoubleSide } )
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.receiveShadow = true;
plane.rotation.set(Math.PI * -0.5, 0, 0);
scene.add( plane );

const loader = new GLTFLoader();

let model;

loader.load( './obj/Rocketship.glb', function ( glb ) {
    model = glb.scene;
	scene.add( model );
    model.scale.set(0.5, 0.5, 0.5);
    model.rotateY(Math.PI / 2);

    model.traverse(function(node) {
        if(node.isMesh) {
            node.castShadow = true;
        }
    })

    loop();

}, undefined, function ( error ) {

	console.error( error );

} );

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

// const grille = new THREE.GridHelper(25, 25);
// scene.add(grille);



window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
});

const light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(50, 100, 10);
light.target.position.set(0, 0, 0);
light.castShadow = true;
scene.add(light);
scene.add(new THREE.DirectionalLightHelper(light));

light.shadow.bias = -0.001;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 50;
light.shadow.camera.far = 150;
light.shadow.camera.left = 100;
light.shadow.camera.right = -100;
light.shadow.camera.top = 100;
light.shadow.camera.bottom = -100;

const shadowHelper = new THREE.CameraHelper( light.shadow.camera );
scene.add( shadowHelper );

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

let rot = 0;

const loop = () => {
    rot += 0.01;
    if(model.positionY > 0.05) {
        model.position.set(0, 0, 0)
    }
    else {
        model.position.set(0, rot, 0);
    }
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
    stats.update();
}
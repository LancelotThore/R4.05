import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Stats from 'three/addons/libs/stats.module.js';

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
const geometry = new THREE.PlaneGeometry( 10, 10 );
const material = new THREE.MeshBasicMaterial( {color: 0x009f00, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
plane.rotation.set(Math.PI * 0.5 , 0, 0);
scene.add( plane );

const geometryBox = new THREE.BoxGeometry( 2, 5, 1 );
const materialBox = new THREE.MeshBasicMaterial( {color: 0x494ff, side: THREE.DoubleSide} );
const box = new THREE.Mesh( geometryBox, materialBox );
box.translateY(3)
scene.add( box );

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.set(0, 50, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const grille = new THREE.GridHelper(25, 25);
scene.add(grille);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.render(scene, camera);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
});

let light = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light.position.set(50, 100, 10);
light.target.position.set(0, 0, 0);
scene.add(light);
scene.add(new THREE.DirectionalLightHelper(light));

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
    scene.add(new THREE.AxesHelper(15));
    scene.add(new THREE.PointLightHelper(light));
    stats.update();
}

loop();
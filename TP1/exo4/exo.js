import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Scene
const scene = new THREE.Scene();
//scene.background = new THREE.Color(0x262626)

// Sphere
const geometry = new THREE.SphereGeometry(3, 45, 45);
const material = new THREE.MeshPhysicalMaterial({
    color: 0xff0000,
    roughness: 0.5,
    metalness: 0.1,
    reflectivity: 0.5,
    clearCoat: 0.9,
    clearCoatRoughness: 0.5,
    lights: true,
    flatShading: false,
    wireframe: false
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 10, 10);
scene.add(light);
const aLight = new THREE.AmbientLight(0x151515);
scene.add(aLight);


// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.z = 20;
scene.add(camera);

// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
});

let degreeY = 0;
let angle = 0;

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
    //mesh.rotateY(degreeY+0.01);
    //mesh.rotateX(degreeY+0.01);
    angle += 0.05
    light.position.set(10 * Math.cos(angle), 10, 10 * Math.sin(angle));
    scene.add(new THREE.AxesHelper(10));
    scene.add(new THREE.PointLightHelper(light));
    scene.add(new THREE.GridHelper(10, 15));
}

loop();

gsap.fromTo(mesh.scale, { x: 1, y:1, z:1 }, { x: 1.5, y:1.5, z:1.5, duration: 5, ease: "elastic"});

function randomColor() {
    let r = Math.floor(256 * Math.random());
    let g = Math.floor(256 * Math.random());
    let b = Math.floor(256 * Math.random());

    return new THREE.Color(r,g,b);
}

window.addEventListener('mousedown', (event) => {
    console.log(mesh.material.color)
    gsap.to(mesh.material, {color: randomColor, ease: ""});
});
import * as THREE from 'three';


// Scene
// Les scènes vous permettent de définir ce qui doit être rendu par three.js et à quel endroit. C'est là que vous placez les objets, les lumières et les caméras.
const scene = new THREE.Scene();


// Sphere
// Une classe pour générer la géométrie d'une sphère
// wireframe : Détermine si l'objet doit être dessiné comme une image filaire. Si la valeur est "true", l'objet sera dessiné sous la forme d'une série de lignes connectées, plutôt que sous la forme d'une surface solide.
const geometry = new THREE.SphereGeometry(3, 16, 16);
const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.5,
    metalness: 0.5,
    reflectivity: 0.5,
    clearCoat: 0.5,
    clearCoatRoughness: 0.5,
    lights: true,
    flatShading: true
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
const camera = new THREE.PerspectiveCamera(45, 800 / 600);
camera.position.z = 20;
scene.add(camera);


// Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(800, 600);
renderer.render(scene, camera);

// 5. Plus il y a de pixels plus, cela demande de ressource au navigateur et donc cela prend davantage de temps.
// Pour éviter des problèmes d'optimisation
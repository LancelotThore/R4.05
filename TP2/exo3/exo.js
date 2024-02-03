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

scene.background = new THREE.TextureLoader().load(['./images/galaxie.jpg']);

// an array of objects whose rotation to update
const objects = [];

// use just one sphere for everything
const radius = 1;
const widthSegments = 64;
const heightSegments = 64;
const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

const mercureDist = radius + 150;
const venusDist = radius + 200;
const earthDist = radius + 250;
const marsDist = radius + 300;
const jupiterDist = radius + 350;
const saturneDist = radius + 400;
const uranusDist = radius + 450;
const neptuneDist = radius + 500;

const solarSystem = new THREE.Object3D();
scene.add(solarSystem);
objects.push(solarSystem);

const earthOrbit = new THREE.Object3D();
earthOrbit.position.x = earthDist;
solarSystem.add(earthOrbit);
objects.push(earthOrbit);

// Soleil
const sunMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xFFFF00,
    emissiveMap: new THREE.TextureLoader().load('./images/sun.jpg'),
    emissiveIntensity: 1
});

const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
sunMesh.scale.set(109, 109, 109);
solarSystem.add(sunMesh);
objects.push(sunMesh);

const color = 0xFFFFFF;
const intensity = 3;
const light = new THREE.PointLight(color, intensity);
scene.add(light);

const torusMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } ); 

// Mercure
const mercureMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xFFFF00,
    emissiveMap: new THREE.TextureLoader().load('./images/mercure.jpg'),
    emissiveIntensity: 1
});

const mercureMesh = new THREE.Mesh(sphereGeometry, mercureMaterial);
mercureMesh.scale.set(0.383, 0.383, 0.383);
mercureMesh.position.x = mercureDist;
solarSystem.add(mercureMesh);
objects.push(mercureMesh);

const mercureTorusGeometry = new THREE.TorusGeometry( mercureDist, 0.05, 30, 200 ); 
const mercureTorus = new THREE.Mesh( mercureTorusGeometry, torusMaterial );
mercureTorus.rotation.set(Math.PI * 0.5 , 0, 0);
scene.add( mercureTorus );

// Venus
const venusMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xFFFF00,
    emissiveMap: new THREE.TextureLoader().load('./images/venus.jpg'),
    emissiveIntensity: 1
});

const venusMesh = new THREE.Mesh(sphereGeometry, venusMaterial);
venusMesh.scale.set(0.949, 0.949, 0.949);
venusMesh.position.x = venusDist;
solarSystem.add(venusMesh);
objects.push(venusMesh);

const venusTorusGeometry = new THREE.TorusGeometry( venusDist, 0.05, 30, 200 ); 
const venusTorus = new THREE.Mesh( venusTorusGeometry, torusMaterial );
venusTorus.rotation.set(Math.PI * 0.5 , 0, 0);
scene.add( venusTorus );

// Terre
const earthColor = "./images/earthmap1k.jpg";
const earthBump = "./images/earthbump1k.jpg";
const earthSpec = "./images/earthspec1k.jpg";
const textureLoader = new THREE.TextureLoader();
const earthMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load(earthColor),
    bumpMap: textureLoader.load(earthBump),
    specularMap: textureLoader.load(earthSpec),
    bumpScale: 0.25,
    shininess: 1
});

const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
earthOrbit.add(earthMesh);
objects.push(earthMesh);

const moonOrbit = new THREE.Object3D();
moonOrbit.position.x = 2;
earthOrbit.add(moonOrbit);

const moonMaterial = new THREE.MeshPhongMaterial({
    emissive: 0x222222,
    map: textureLoader.load('./images/moon.jpg'),
    emissiveIntensity: 1
});
const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
moonMesh.scale.set(0.272, 0.272, 0.272);
moonOrbit.add(moonMesh);
objects.push(moonMesh);

const earthTorusGeometry = new THREE.TorusGeometry( earthDist, 0.05, 30, 200 ); 
const earthTorus = new THREE.Mesh( earthTorusGeometry, torusMaterial );
earthTorus.rotation.set(Math.PI * 0.5 , 0, 0);
scene.add( earthTorus );

// Mars
const marsMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xFFFF00,
    emissiveMap: new THREE.TextureLoader().load('./images/mars.jpg'),
    emissiveIntensity: 1
});

const marsMesh = new THREE.Mesh(sphereGeometry, marsMaterial);
marsMesh.scale.set(0.532, 0.532, 0.532);
marsMesh.position.x = marsDist;
solarSystem.add(marsMesh);
objects.push(marsMesh);

const marsTorusGeometry = new THREE.TorusGeometry( marsDist, 0.05, 30, 200 ); 
const marsTorus = new THREE.Mesh( marsTorusGeometry, torusMaterial );
marsTorus.rotation.set(Math.PI * 0.5 , 0, 0);
scene.add( marsTorus );

// Jupiter
const jupiterMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xFFFF00,
    emissiveMap: new THREE.TextureLoader().load('./images/jupiter.jpg'),
    emissiveIntensity: 1
});

const jupiterMesh = new THREE.Mesh(sphereGeometry, jupiterMaterial);
jupiterMesh.scale.set(10.974, 10.974, 10.974);
jupiterMesh.position.x = jupiterDist;
solarSystem.add(jupiterMesh);
objects.push(jupiterMesh);

const jupiterTorusGeometry = new THREE.TorusGeometry( jupiterDist, 0.05, 30, 200 ); 
const jupiterTorus = new THREE.Mesh( jupiterTorusGeometry, torusMaterial );
jupiterTorus.rotation.set(Math.PI * 0.5 , 0, 0);
scene.add( jupiterTorus );

// Saturne
const saturneMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xFFFF00,
    emissiveMap: new THREE.TextureLoader().load('./images/saturne.jpg'),
    emissiveIntensity: 1
});

const saturneMesh = new THREE.Mesh(sphereGeometry, saturneMaterial);
saturneMesh.scale.set(9.140, 9.140, 9.140);
saturneMesh.position.x = saturneDist;
solarSystem.add(saturneMesh);
objects.push(saturneMesh);

const saturneTorusGeometry = new THREE.TorusGeometry( saturneDist, 0.05, 30, 200 ); 
const saturneTorus = new THREE.Mesh( saturneTorusGeometry, torusMaterial );
saturneTorus.rotation.set(Math.PI * 0.5 , 0, 0);
scene.add( saturneTorus );

// Uranus
const uranusMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xFFFF00,
    emissiveMap: new THREE.TextureLoader().load('./images/uranus.jpg'),
    emissiveIntensity: 1
});

const uranusMesh = new THREE.Mesh(sphereGeometry, uranusMaterial);
uranusMesh.scale.set(3.979, 3.979, 3.979);
uranusMesh.position.x = uranusDist;
solarSystem.add(uranusMesh);
objects.push(uranusMesh);

const uranusTorusGeometry = new THREE.TorusGeometry( uranusDist, 0.05, 30, 200 ); 
const uranusTorus = new THREE.Mesh( uranusTorusGeometry, torusMaterial );
uranusTorus.rotation.set(Math.PI * 0.5 , 0, 0);
scene.add( uranusTorus );

// Neptune
const neptuneMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xFFFF00,
    emissiveMap: new THREE.TextureLoader().load('./images/neptune.jpg'),
    emissiveIntensity: 1
});

const neptuneMesh = new THREE.Mesh(sphereGeometry, neptuneMaterial);
neptuneMesh.scale.set(3.86, 3.86, 3.86);
neptuneMesh.position.x = neptuneDist;
solarSystem.add(neptuneMesh);
objects.push(neptuneMesh);

const neptuneTorusGeometry = new THREE.TorusGeometry( neptuneDist, 0.05, 30, 200 ); 
const neptuneTorus = new THREE.Mesh( neptuneTorusGeometry, torusMaterial );
neptuneTorus.rotation.set(Math.PI * 0.5 , 0, 0);
scene.add( neptuneTorus );

// Camera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight);
camera.position.set(0, 1000, 0);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

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

const grille = new THREE.GridHelper(1050, 1050);
scene.add(grille);

const gui = new GUI();

const obj = {
    Soleil: true,
    Mercure: true,
    Venus: true,
    Terre: true,
    Lune: true,
    Mars: true,
    Jupiter: true,
    Saturne: true,
    Uranus: true,
    Neptune: true,
    grille: false,
    vitesse: 0.005,
}

gui.add(obj, 'Soleil');
gui.add(obj, 'Mercure');
gui.add(obj, 'Vénus');
gui.add(obj, 'Terre');
gui.add(obj, 'Lune');
gui.add(obj, 'Mars');
gui.add(obj, 'Jupiter');
gui.add(obj, 'Saturne');
gui.add(obj, 'Uranus');
gui.add(obj, 'Neptune');
gui.add(obj, 'grille');
gui.add(obj, 'vitesse', 0.0, 0.1);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
    solarSystem.rotateY(obj.vitesse);
    sunMesh.visible = obj.Soleil;
    sunMesh.rotateY(obj.vitesse);
    mercureMesh.visible = obj.Mercure;
    venusMesh.visible = obj.Venus;
    earthMesh.visible = obj.Terre;
    earthOrbit.rotateY(obj.vitesse);
    moonMesh.visible = obj.Lune;
    moonMesh.rotateY(obj.vitesse);
    jupiterMesh.visible = obj.Jupiter;
    saturneMesh.visible = obj.Saturne;
    uranusMesh.visible = obj.Uranus;
    neptuneMesh.visible = obj.Neptune;
    //scene.add(new THREE.AxesHelper(15));
    //scene.add(new THREE.PointLightHelper(light));
    grille.visible = obj.grille;
    stats.update();
}

loop();
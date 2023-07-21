// import './style.css';
// import * as THREE from 'three';
import * as THREE from './node_modules/three/build/three.module.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// const signs = document.querySelectorAll('x-sign');
// const randomIn = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const mixupInterval = (el) => {
// 	const ms = randomIn(2000, 4000);
// 	el.style.setProperty('--interval', `${ms}ms`);
// };

// signs.forEach((el) => {
// 	mixupInterval(el);
// 	el.addEventListener('webkitAnimationIteration', () => {
// 		mixupInterval(el);
// 	});
// });

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
	canvas: document.querySelector('#bg'),
	antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);

// scene.add(torus);

// Create a loading manager
let shallowTorus;
const loadingManager = new THREE.LoadingManager();

// Load the 3D model asynchronously
const loader = new GLTFLoader(loadingManager);

let torusUrl = new URL(`assets/torus_entanglement.glb`, import.meta.url).href

loader.load(
	torusUrl,
	function (gltf) {
		// Change the value to adjust the scaling
		var scale = 16;
		gltf.scene.scale.set(scale, scale, scale);

		shallowTorus = gltf.scene;
		scene.add(gltf.scene);
	},
	function (xhr) {
		// Progress callback (optional)
		// const percentComplete = xhr.loaded / xhr.total * 100;
		// console.log(`Model loading: ${percentComplete.toFixed(2)}%`);
	},
	function (error) {
		// Error callback (optional)
		console.error('Error loading 3D model:', error);
	}
);


let nebulaUrl = new URL(`assets/nebula.glb`, import.meta.url).href
loader.load(
	nebulaUrl,
	function (gltf) {
		// var scale = 0.001;
		// gltf.scene.scale.set(scale, scale, scale);
		let nebulaModel = gltf.scene;
		nebulaModel.rotation.y += 5;

		scene.add(nebulaModel);
	},
	function (xhr) {
	},
	function (error) {
		// Error callback (optional)
		console.error('Error loading 3D model:', error);
	}
);
let ironman;
let ironmanUrl = new URL(`assets/iron_man.glb`, import.meta.url).href
loader.load(
	ironmanUrl,
	function (gltf) {
		// var scale = 0.45;
		var scale = 1;
		gltf.scene.scale.set(scale, scale, scale);
		ironman = gltf.scene;

		scene.add(ironman);

		// ironman.position.z = 74.2;
		// ironman.position.setX(0.6);
		// ironman.position.y = -0.5;

		ironman.position.z = -2;
		ironman.position.x = 1;
		ironman.position.y = -1;
	},
	function (xhr) {
		// Progress callback (optional)
		// const percentComplete = xhr.loaded / xhr.total * 100;
		// console.log(`Model loading: ${percentComplete.toFixed(2)}%`);
	},
	function (error) {
		// Error callback (optional)
		console.error('Error loading 3D model:', error);
	}
);

// Lights
// const pointLight = new THREE.PointLight(0xffffff);
// pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
// scene.add(pointLight, ambientLight);
scene.add(ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);
// const controls = new OrbitControls(camera, renderer.domElement);

// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );

function addStar () {
	const geometry = new THREE.SphereGeometry(0.3, 13, 13);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [ x, y, z ] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(250));

	star.position.set(x, y, z);
	scene.add(star);
}

Array(1700).fill().forEach(addStar);

// Background
let spaceUrl = new URL(`space.jpg`, import.meta.url).href
const bgTexture = new THREE.TextureLoader().load(spaceUrl);
bgTexture.colorSpace = THREE.SRGBColorSpace;
scene.background = bgTexture;

// Avatar
// const jeffTexture = new THREE.TextureLoader().load('images/dhruv2.jpg');
// const dhruv = new THREE.Mesh(
// 	new THREE.BoxGeometry(3, 3, 3),
// 	new THREE.MeshBasicMaterial({ map: jeffTexture })
// );
// scene.add(dhruv);

// Moon
let moonUrl = new URL(`moon.jpg`, import.meta.url).href
let normalUrl = new URL(`normal.jpg`, import.meta.url).href
const moonTexture = new THREE.TextureLoader().load(moonUrl);
const normalTexture = new THREE.TextureLoader().load(normalUrl);

const moon = new THREE.Mesh(
	new THREE.SphereGeometry(5, 32, 32),
	new THREE.MeshStandardMaterial({
		map: moonTexture,
		normalMap: normalTexture
	})
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

// dhruv.position.z = -5;
// dhruv.position.x = 2;

// Scroll Animation

function moveCamera () {
	const t = document.body.getBoundingClientRect().top;
	// moon.rotation.x += 0.05;
	// moon.rotation.y += 0.075;
	// moon.rotation.z += 0.05;

	// dhruv.rotation.y += 0.01;
	// dhruv.rotation.z += 0.01;

	// camera.position.z = t * -0.01;
	// camera.position.x = t * -0.0002;
	// camera.rotation.y = t * -0.0002;
	camera.position.z = t * -0.017;
	camera.position.x = t * -0.0002;
	camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate () {
	requestAnimationFrame(animate);

	// dhruv.rotation.x += 0.003;
	// dhruv.rotation.y += 0.0003;
	// dhruv.rotation.z += 0.003;

	if (ironman != undefined) {
		ironman.rotation.y += 0.005;
	}

	if (shallowTorus != undefined) {
		// shallowTorus.rotation.x += 0.01;
		// shallowTorus.rotation.y += 0.005;
		// shallowTorus.rotation.z += 0.01;
		shallowTorus.rotation.x += 0.006;
		shallowTorus.rotation.y += 0.004;
		shallowTorus.rotation.z += 0.006;
	}

	moon.rotation.x += 0.005;

	// controls.update();

	renderer.render(scene, camera);
}

animate();

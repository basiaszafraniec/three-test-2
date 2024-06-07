import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";


//SET UP
const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//CAMERA
const camera = new THREE.PerspectiveCamera(40, (window.innerWidth / window.innerHeight), 0.1, 1000);
// const camera= new THREE.OrthographicCamera();
camera.position.z = 150;
camera.position.y = 0;
camera.position.x = 0;

//SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x882266);

//RESIZE
function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const pixelRatio = window.devicePixelRatio;
    const width = Math.floor(canvas.clientWidth * pixelRatio);
    const height = Math.floor(canvas.clientHeight * pixelRatio);
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
        renderer.setSize(width, height, false);
    }
    return needResize;
}
resizeRendererToDisplaySize(renderer);

//LIGHT
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x0000ff, 3);
directionalLight.position.set(-1, 2, 4);
scene.add(directionalLight);


//ORBIT
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.target.set(0, 0, 0);
orbit.update();

//ADD MORE CUBES
function addCube(s, pos) {
    let cubeGeo = new THREE.BoxGeometry(s, s, s);
    let cubeMat = new THREE.MeshPhongMaterial({ color: 0xffffff });

    let cube = new THREE.Mesh(cubeGeo, cubeMat);
    cube.position.set(0, pos, 0);
    scene.add(cube);
}

//ROTATE CUBES
let r = 0;

function rotateAllCubes() {
    scene.traverse((object) => {
        if (object.isMesh && object.geometry instanceof THREE.BoxGeometry) {
            object.rotation.y = r;
        }
    });
}

//ADDING OBJECTS
const objects = [];
const spread = 15;

class Object {
    constructor(geo) {
        this.x = ((Math.random() * 10) - 5);
        this.y = Math.random() * 10 - 5;
        this.z = Math.random() * 10 - 5;
        this.geo = geo;
        this.obj = new THREE.Mesh(geo, this.createMaterial());
        this.obj.position.x = this.x * spread;
        this.obj.position.y = this.y * spread;
        this.obj.position.z = this.z * spread;

        scene.add(this.obj);
        objects.push(this.obj);
    }

    createMaterial() {
        const material = new THREE.MeshStandardMaterial({ side: THREE.DoubleSide })
        const hue = Math.random();
        const saturation = 1;
        const luminance = .5;
        material.color.setHSL(hue, saturation, luminance);

        return material;
    }
}

// let x = 0;
// let y = 0;
function addBoxes() {
    const width = Math.random() * 10;
    // if (x > 4) {
    //     x = 0;
    //     y += 1;
    // } else {
    //     x += 1;
    // }
    new Object((new THREE.BoxGeometry(width, width, width)));
    console.log(objects)
}

for (let i = 0; i < 200; i += 1) {
    addBoxes();
}

//AMIMATE
let l = 90;
function animate() {
    requestAnimationFrame(animate);

    function buildTower() {
        l += 1;
        if (l % 100 === 0) {
            addCube(1, (l / 100) - 2);
        }
        if (r >= Math.PI * 2) {
            r -= Math.PI * 2;
        }
        r += 0.01;

        rotateAllCubes();
    }
    // buildTower();




    renderer.render(scene, camera);

}
animate();




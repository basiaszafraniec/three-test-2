import * as THREE from 'three';

const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const camera = new THREE.OrthographicCamera();
camera.position.z = 2;

const scene = new THREE.Scene();

renderer.render(scene,camera);
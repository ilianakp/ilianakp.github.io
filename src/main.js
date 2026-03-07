// main.js — entry point, sets up the Three.js scene
//
// THREE.js concepts mapped to what you know:
//   Scene        ≈ Unity Hierarchy (holds all objects)
//   Camera       ≈ Camera component
//   Renderer     ≈ the game window / render pipeline
//   OrbitControls ≈ a camera rig with orbit + zoom + pan built in
//   animate()    ≈ Unity's Update() loop

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createCards, billboardCards } from './cards.js';
import { initTargets, applyFilter, animateFilters } from './filters.js';
import './style.css';

// ─── Scene setup ─────────────────────────────────────────────────────────────

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d0a0a); // near-black with a warm tint

// PerspectiveCamera(fov, aspect, near, far)
// fov=60 is a natural field of view (Rhino default is 50)
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
camera.position.set(0, 0, 300); // start position: looking into the card cloud

// WebGL renderer — attaches a <canvas> to the page
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // retina support
document.getElementById('canvas-container').appendChild(renderer.domElement);

// ─── Lighting ─────────────────────────────────────────────────────────────────

// Ambient light: fills the whole scene evenly (like a skylight in Rhino)
scene.add(new THREE.AmbientLight(0xffffff, 1.2));

// ─── OrbitControls ────────────────────────────────────────────────────────────
// This is the key 3D navigation: scroll=zoom, drag=orbit, right-drag=pan
// On touch: pinch=zoom, 1-finger=orbit, 2-finger=pan

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;    // smooth deceleration (like inertia in Rhino)
controls.dampingFactor = 0.06;
controls.minDistance = 50;        // how close you can zoom in
controls.maxDistance = 800;       // how far you can zoom out
controls.zoomSpeed = 1.2;

// ─── Project cards ────────────────────────────────────────────────────────────

const cards = createCards(scene);
initTargets(cards);

// ─── Raycasting (click & hover detection) ────────────────────────────────────
// A Raycaster shoots an invisible ray from the camera through the mouse cursor
// and finds which 3D objects it intersects — like Physics.Raycast in Unity.

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(); // mouse position in -1..1 normalized coords

let hoveredCard = null;
const labelEl = document.getElementById('card-label');

function updatePointer(clientX, clientY) {
  pointer.x = (clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(clientY / window.innerHeight) * 2 + 1;
}

// Mouse move → show label on hover
window.addEventListener('mousemove', (e) => {
  updatePointer(e.clientX, e.clientY);
  checkHover();
});

// Click → open project page (only on canvas, not on UI buttons)
window.addEventListener('click', (e) => {
  if (e.target !== renderer.domElement) return;
  updatePointer(e.clientX, e.clientY);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(cards);
  if (hits.length > 0) {
    const { project } = hits[0].object.userData;
    window.location.href = `/project.html?id=${project.slug}`;
  }
});

// Touch tap → open project page
renderer.domElement.addEventListener('touchend', (e) => {
  if (e.changedTouches.length !== 1) return;
  const touch = e.changedTouches[0];
  updatePointer(touch.clientX, touch.clientY);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(cards);
  if (hits.length > 0) {
    const { project } = hits[0].object.userData;
    window.location.href = `/project.html?id=${project.slug}`;
  }
});

function checkHover() {
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(cards);

  if (hits.length > 0) {
    const card = hits[0].object;
    if (card !== hoveredCard) {
      if (hoveredCard) hoveredCard.userData.hoverActive = false;
      hoveredCard = card;
      card.userData.hoverActive = true;
      renderer.domElement.style.cursor = 'pointer';
      labelEl.textContent = card.userData.project.title;
      labelEl.style.opacity = '1';
    }
  } else {
    if (hoveredCard) {
      hoveredCard.userData.hoverActive = false;
      hoveredCard = null;
    }
    renderer.domElement.style.cursor = 'default';
    labelEl.style.opacity = '0';
  }
}

// ─── Filter buttons ───────────────────────────────────────────────────────────

document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    applyFilter(cards, category);
  });
});

// ─── Resize handling ──────────────────────────────────────────────────────────

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ─── Animation loop ───────────────────────────────────────────────────────────
// requestAnimationFrame is the browser's equivalent of Unity's Update().
// It calls animate() before each screen repaint (~60fps).

function animate() {
  requestAnimationFrame(animate);

  controls.update();              // apply damping to camera movement
  billboardCards(cards, camera);  // make cards face the camera every frame
  animateFilters(cards);          // smoothly animate filter opacity/scale

  renderer.render(scene, camera);
}

animate();

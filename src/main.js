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
scene.background = new THREE.Color(0xffffff); // white

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

scene.add(new THREE.AmbientLight(0xffffff, 1.2));

// ─── OrbitControls ────────────────────────────────────────────────────────────
// This is the key 3D navigation: scroll=zoom, drag=orbit, right-drag=pan
// On touch: pinch=zoom, 1-finger=orbit, 2-finger=pan

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;    // smooth deceleration (like inertia in Rhino)
controls.dampingFactor = 0.06;
controls.enableRotate = false;    // no rotation — only zoom and pan
controls.panSpeed = 1.8;          // faster panning
controls.minDistance = 150;       // how close you can zoom in
controls.maxDistance = 450;       // how far you can zoom out
controls.zoomSpeed = 1.2;

// Remap left-click to pan (since rotation is off, left-click would do nothing by default)
controls.mouseButtons = {
  LEFT: THREE.MOUSE.PAN,
  MIDDLE: THREE.MOUSE.DOLLY,
  RIGHT: THREE.MOUSE.PAN,
};

// Touch: one finger pans, two fingers zoom+pan
controls.touches = {
  ONE: THREE.TOUCH.PAN,
  TWO: THREE.TOUCH.DOLLY_PAN,
};

// ─── Grid sphere ──────────────────────────────────────────────────────────────
// A large wireframe sphere that surrounds the whole scene.
// EdgesGeometry extracts only the shared edges of the sphere faces,
// giving clean latitude/longitude grid lines instead of triangle diagonals.
// Think of it like a Rhino sphere with a surface grid display, rendered as lines.

const sphereGeo = new THREE.SphereGeometry(700, 36, 24);
const sphereEdges = new THREE.EdgesGeometry(sphereGeo);
const sphereLines = new THREE.LineSegments(
  sphereEdges,
  new THREE.LineBasicMaterial({ color: 0xcccccc }) // light gray on white
);
scene.add(sphereLines);

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

// Click vs drag detection — only navigate if the pointer barely moved
// (prevents drag-panning from accidentally opening a project page)
let pointerDownPos = { x: 0, y: 0 };
const CLICK_THRESHOLD = 6; // pixels — movement within this = treated as a click

renderer.domElement.addEventListener('pointerdown', (e) => {
  pointerDownPos = { x: e.clientX, y: e.clientY };
});

renderer.domElement.addEventListener('pointerup', (e) => {
  const dx = e.clientX - pointerDownPos.x;
  const dy = e.clientY - pointerDownPos.y;
  const moved = Math.sqrt(dx * dx + dy * dy);
  if (moved > CLICK_THRESHOLD) return; // it was a drag, not a click

  updatePointer(e.clientX, e.clientY);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(cards);
  if (hits.length > 0) {
    const { project } = hits[0].object.userData;
    window.location.href = `/project.html?id=${project.slug}`;
  }
});

// Touch tap — same threshold logic via pointerdown/pointerup (works for touch too)

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
    // 'all' clears all active states — no button highlighted, all cards visible
    if (category !== 'all') btn.classList.add('active');
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

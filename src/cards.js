// cards.js — creates 3D project cards in the Three.js scene
//
// Think of this like instantiating GameObjects in Unity:
//   THREE.Mesh        ≈ GameObject with MeshRenderer
//   THREE.PlaneGeometry ≈ a flat quad mesh
//   THREE.MeshBasicMaterial ≈ an Unlit material (no lighting needed for flat images)
//   TextureLoader     ≈ Resources.Load for textures

import * as THREE from 'three';
import { projects } from './projects.js';

const CARD_WIDTH = 80;   // world-space units wide
const CARD_HEIGHT = 55;  // world-space units tall

// Placeholder color per category — shown before real images are added
const PLACEHOLDER_COLORS = {
  'interactive': 0x8b3a3a,
  'data&visuals': 0x3a5c8b,
  'research': 0x3a7a4a,
};

// Spread seeds: deterministic "random" positions so the layout is always the same
// (you can tweak these numbers to rearrange the cloud)
const POSITIONS = [
  [ 120,  40, -100],
  [-150,  70,  -50],
  [  30, -60, -200],
  [-200, -20, -150],
  [ 180, -80,   20],
  [ -60,  90, -300],
  [  90,  20,  -80],
  [-120, -70, -250],
  [ 200,  60, -180],
  [ -30, -90,  -30],
  [ 150, -30, -320],
  [ -80,  50, -400],
  [  50,  80, -270],
  [-180, -50, -100],
];

export function createCards(scene) {
  const loader = new THREE.TextureLoader();
  const cards = []; // we return this list so other code can reference the cards

  projects.forEach((project, i) => {
    // Try to load the project thumbnail texture.
    // If the image file doesn't exist yet, fall back to a colored placeholder.
    const color = PLACEHOLDER_COLORS[project.category] ?? 0x444444;
    const material = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });

    // Load the real image — when it succeeds, swap it in
    loader.load(
      project.thumbnail,
      (texture) => {
        material.map = texture;
        material.color.set(0xffffff); // remove tint so image shows true colors
        material.needsUpdate = true;
      },
      undefined, // onProgress — not used
      () => { /* silently keep the colored placeholder if image is missing */ }
    );

    const geometry = new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT);
    const mesh = new THREE.Mesh(geometry, material);

    // Position in 3D space using our preset layout
    const [x, y, z] = POSITIONS[i] ?? [0, 0, -200];
    mesh.position.set(x, y, z);

    // Attach project data to the mesh so we can read it on click/hover
    mesh.userData = { project, index: i };

    scene.add(mesh);
    cards.push(mesh);
  });

  return cards;
}

// Billboard: make all cards always face the camera.
// Call this every frame inside the animation loop.
// In Unity this would be a LookAt billboard script on each object.
export function billboardCards(cards, camera) {
  cards.forEach((card) => {
    card.quaternion.copy(camera.quaternion);
  });
}

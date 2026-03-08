// cards.js — creates 3D project cards in the Three.js scene
//
// Think of this like instantiating GameObjects in Unity:
//   THREE.Mesh        ≈ GameObject with MeshRenderer
//   THREE.PlaneGeometry ≈ a flat quad mesh
//   THREE.MeshBasicMaterial ≈ an Unlit material (no lighting needed for flat images)
//   TextureLoader     ≈ Resources.Load for textures

import * as THREE from 'three';
import { projects } from './projects.js';

// Placeholder color per category — shown before real images are added
// Desaturated pastels that read well on the warm off-white background
const PLACEHOLDER_COLORS = {
  'interactive': 0xd4b8b8,  // dusty rose
  'data&visuals': 0xb8c8d4, // pale blue-gray
  'research': 0xc0d4bc,     // sage green
};

// Deterministic per-card jitter as a fraction of cell size (so it scales with screen)
const JITTER = [
  [ 0.15, -0.20], [-0.20,  0.20], [ 0.20,  0.15], [-0.15, -0.20],
  [ 0.25,  0.15], [-0.20,  0.15], [ 0.10, -0.25], [-0.10,  0.20],
  [ 0.20, -0.10], [-0.25, -0.15], [ 0.15,  0.25], [-0.10, -0.20],
  [ 0.25,  0.10], [-0.20,  0.20],
];

// Small z offsets for depth — same for every screen size
const DEPTHS = [-10, -40, -20, -60, -30, -50, -20, -55, -35, -50, -70, -15, -45, -65];

// createCards now takes the camera so it can read the real frustum size at load time.
// Returns { cards, spreadX, spreadY } — main.js uses the spread for pan clamping.
export function createCards(scene, camera) {
  // How much of the frustum (at z=0) to fill with cards
  const FILL = 0.82;

  const aspect = window.innerWidth / window.innerHeight;
  const tanHalfFov = Math.tan((camera.fov * Math.PI) / 360);
  const visibleHalfH = camera.position.z * tanHalfFov;
  const visibleHalfW = visibleHalfH * aspect;

  const spreadX = visibleHalfW * FILL;
  const spreadY = visibleHalfH * FILL;

  // Decide grid dimensions based on aspect ratio so cards fill the screen shape
  const n = projects.length;
  const cols = Math.max(2, Math.round(Math.sqrt(n * aspect)));
  const rows = Math.ceil(n / cols);

  const cellW = (spreadX * 2) / cols;
  const cellH = (spreadY * 2) / rows;
  // On mobile (portrait) cards are larger and can overlap a bit
  const cardFill = aspect < 1 ? 1.15 : 1.0;
  const cardMax = Math.min(cellW, cellH) * cardFill;

  const loader = new THREE.TextureLoader();
  const cards = [];

  projects.forEach((project, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Cell center (top-left origin → convert to Three.js coords)
    const cx = -spreadX + cellW * (col + 0.5);
    const cy =  spreadY - cellH * (row + 0.5);

    // Add jitter so it looks scattered, not like a rigid grid
    const [jx, jy] = JITTER[i] ?? [0, 0];
    const x = cx + jx * cellW * 0.4;
    const y = cy + jy * cellH * 0.4;
    const z = DEPTHS[i] ?? -30;

    const color = PLACEHOLDER_COLORS[project.category] ?? 0x444444;
    const material = new THREE.MeshBasicMaterial({
      color,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });

    // Load the real image — resize the card to match the image's aspect ratio
    loader.load(
      project.thumbnail,
      (texture) => {
        const imgAspect = texture.image.width / texture.image.height;
        const w = imgAspect >= 1 ? cardMax : cardMax * imgAspect;
        const h = imgAspect >= 1 ? cardMax / imgAspect : cardMax;
        mesh.geometry.dispose();
        mesh.geometry = new THREE.PlaneGeometry(w, h);
        material.map = texture;
        material.color.set(0xffffff);
        material.needsUpdate = true;
      },
      undefined,
      () => { /* silently keep the colored placeholder if image is missing */ }
    );

    const geometry = new THREE.PlaneGeometry(cardMax, cardMax * 0.68);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.userData = { project, index: i };

    scene.add(mesh);
    cards.push(mesh);
  });

  return { cards, spreadX, spreadY };
}

// Billboard: make all cards always face the camera.
// Call this every frame inside the animation loop.
// In Unity this would be a LookAt billboard script on each object.
export function billboardCards(cards, camera) {
  cards.forEach((card) => {
    card.quaternion.copy(camera.quaternion);
  });
}

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
  [ 0.10, -0.15], [ 0.15, -0.20], [-0.20,  0.20], [ 0.20,  0.15], [-0.15, -0.20],
  [ 0.25,  0.15], [-3,  0.15], [ 0.10, -0.25], [-0.10,  0.20],
  [ 0.20, -0.10], [-0.25, -0.15], [-5, -0.8], [-0.10, -0.20],
  [ 0.25,  0.10], [-0.20,  0.20],
];

// Small per-card z variation layered on top of the spherical base depth
const DEPTHS = [-15, -2, -45, -20, -60, -25, -55, -20, -55, -200, -55, -160, -15, -45, -70];


// createCards now takes the camera so it can read the real frustum size at load time.
// Returns { cards, spreadX, spreadY } — main.js uses the spread for pan clamping.
export function createCards(scene, camera) {
  const aspect = window.innerWidth / window.innerHeight;
  const isMobile = aspect < 1;

  // On mobile: smaller cards, wider spread so they don't overlap
  const FILL     = isMobile ? 1.6 : 1.5;
  const cardFill = isMobile ? 0.9 : 1.2;

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
  const cardMax = Math.min(cellW, cellH) * cardFill;

  const loader = new THREE.TextureLoader();
  const cards = [];

  projects.forEach((project, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);

    // Cell center — shift the whole grid down to clear the nav bar
    const navOffset = visibleHalfH * (isMobile ? 0.50 : 0.10);
    const cx = -spreadX + cellW * (col + 0.5);
    const cy =  spreadY - cellH * (row + 0.5) - navOffset;

    // Add jitter so it looks scattered, not like a rigid grid
    const [jx, jy] = JITTER[i] ?? [0, 0];
    const jitterScale = aspect < 1.3 ? 0 : 0.4;
    let x = cx + jx * cellW * jitterScale;
    let y = cy + jy * cellH * jitterScale;

    // Desktop: per-card nudges for better layout
    if (!isMobile && i === 0) x -= cellW * 0.6;    // FoT: left
    if (!isMobile && i === 1) x -= cellW * 0;    // Odyssey: right
    if (!isMobile && i === 3) y -= cellH * 0.3;    // K41: down
    if (!isMobile && i === 11) y -= cellH * 1;   // Shudder: down
    if (!isMobile && i === 12) x -= cellW * 0.6;   // Were You Here: left

    // Spherical layout: cards curve back from centre (paraboloid).
    // Cards near the edge of the screen are further from the camera,
    const edgeDepth = isMobile ? 60 : 260;
    const denom = spreadX * spreadX + spreadY * spreadY;
    const sphereZ = -edgeDepth * (cx * cx + cy * cy) / denom;
    // On mobile, clamp per-card depth variation so no card gets pushed way back
    const depthVal = DEPTHS[i] ?? 0;
    const z = sphereZ + (isMobile ? Math.max(depthVal, -30) : depthVal);

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
        const scale = project.thumbScale ?? 1;
        const w = (imgAspect >= 1 ? cardMax : cardMax * imgAspect) * scale;
        const h = (imgAspect >= 1 ? cardMax / imgAspect : cardMax) * scale;
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


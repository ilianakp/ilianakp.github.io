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
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { createCards } from './cards.js';
import { initTargets, applyFilter, animateFilters } from './filters.js';
import './style.css';

// ─── Scene setup ─────────────────────────────────────────────────────────────

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xfaf6f1); // near-white warm beige fallback

// PerspectiveCamera(fov, aspect, near, far)
// fov=60 is a natural field of view (Rhino default is 50)
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
const startZ = navigator.maxTouchPoints > 0 ? 65 : 130;
camera.position.set(0, 0, startZ);

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
controls.dampingFactor = 0.08;
controls.enableRotate = false;    // no rotation — only zoom and pan
controls.panSpeed = 2.5;          // faster panning
controls.minDistance = navigator.maxTouchPoints > 0 ? 15 : 30;
controls.maxDistance = navigator.maxTouchPoints > 0 ? 300 : 450;
controls.zoomSpeed = 1.8;

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

// ─── Background sphere ────────────────────────────────────────────────────────
// Solid sphere rendered from the inside (BackSide) with vertex colors:
// beige at the equator, fading to pale pink at the poles.

const bgGeo = new THREE.SphereGeometry(690, 36, 24);
const bgPos = bgGeo.attributes.position;
const bgColors = new Float32Array(bgPos.count * 3);
const beige    = new THREE.Color(0xfaf6f1); // near-white warm beige — horizon
const palePink = new THREE.Color(0x000000); // black — poles
for (let i = 0; i < bgPos.count; i++) {
  const t = Math.abs(bgPos.getY(i)) / 690; // 0 at equator → 1 at poles
  const c = beige.clone().lerp(palePink, t);
  bgColors[i * 3] = c.r; bgColors[i * 3 + 1] = c.g; bgColors[i * 3 + 2] = c.b;
}
bgGeo.setAttribute('color', new THREE.BufferAttribute(bgColors, 3));
scene.add(new THREE.Mesh(bgGeo, new THREE.MeshBasicMaterial({
  vertexColors: true,
  side: THREE.BackSide,
})));

// Wireframe grid lines on top — warm gray to sit softly against the gradient
const sphereEdges = new THREE.EdgesGeometry(new THREE.SphereGeometry(700, 36, 24));
const sphereLines = new THREE.LineSegments(
  sphereEdges,
  new THREE.LineBasicMaterial({ color: 0xddd5c8 }) // warm light gray
);
scene.add(sphereLines);

// ─── Project cards ────────────────────────────────────────────────────────────

const { cards, spreadX, spreadY } = createCards(scene, camera);
initTargets(cards);

// ─── Intro zoom-in animation ──────────────────────────────────────────────────
// Cards are baked at startZ in createCards(); start the camera further back and
// ease in over ~2 seconds. Runs after createCards so card positions are correct.
const INTRO_DURATION_MS = 2000;
const introStartZ = startZ * 1.6;
camera.position.z = introStartZ;
controls.enabled = false;
const introStartTime = performance.now();
let introDone = false;

const zoomHintEl = document.getElementById('zoom-hint');
function hideZoomHint() {
  if (zoomHintEl) zoomHintEl.classList.add('hide');
}

function skipIntro() {
  if (introDone) return;
  introDone = true;
  camera.position.z = startZ;
  controls.enabled = true;
  controls.update();
  hideZoomHint();
}
['pointerdown', 'wheel', 'touchstart', 'keydown'].forEach((evt) =>
  window.addEventListener(evt, skipIntro, { once: true, passive: true })
);

// ─── 3D model thumbnails ───────────────────────────────────────────────────
// Cards with a model3d field render a spinning 3D model as their texture.

const modelThumbs = []; // { card, model, rtScene, rtCamera, renderTarget }

cards.forEach((card) => {
  const { project } = card.userData;
  if (!project.model3d) return;

  const rtSize = 512;
  const renderTarget = new THREE.WebGLRenderTarget(rtSize, rtSize);

  const rtScene = new THREE.Scene();
  rtScene.background = new THREE.Color(0xfaf6f1);
  rtScene.add(new THREE.AmbientLight(0xffffff, 0.8));
  const dLight = new THREE.DirectionalLight(0xffffff, 1);
  dLight.position.set(5, 5, 5);
  rtScene.add(dLight);

  const rtCamera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  rtCamera.position.set(0, 0, 3);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader);

  gltfLoader.load(project.model3d, (gltf) => {
    const model = gltf.scene;
    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const s = 2 / maxDim;
    model.scale.setScalar(s);
    model.position.sub(center.multiplyScalar(s));
    rtScene.add(model);

    // Apply render target as the card texture
    card.material.map = renderTarget.texture;
    card.material.color.set(0xffffff);
    card.material.needsUpdate = true;

    modelThumbs.push({ card, model, rtScene, rtCamera, renderTarget });
  });
});

// ─── Raycasting (click & hover detection) ────────────────────────────────────
// A Raycaster shoots an invisible ray from the camera through the mouse cursor
// and finds which 3D objects it intersects — like Physics.Raycast in Unity.

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2(); // mouse position in -1..1 normalized coords

let hoveredCard = null;
const labelEl = document.getElementById('card-label');

// Detect touch device — on touch screens labels are always visible (no hover)
const isTouch = navigator.maxTouchPoints > 0;

// Mobile: one persistent label per card, updated every frame
const persistentLabels = [];
if (isTouch) {
  labelEl.style.display = 'none'; // hide the single hover label
  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:10;';
  document.body.appendChild(container);

  cards.forEach((card) => {
    const el = document.createElement('div');
    el.className = 'card-label-mobile';
    const { title, tagline } = card.userData.project;
    el.innerHTML = `<span class="label-title">${title}</span>${tagline ? `<span class="label-tagline">${tagline}</span>` : ''}`;
    container.appendChild(el);
    persistentLabels.push({ el, card });
  });
}

function updatePointer(clientX, clientY) {
  pointer.x = (clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(clientY / window.innerHeight) * 2 + 1;
}

// Mouse move → show label on hover (desktop only)
if (!isTouch) {
  window.addEventListener('mousemove', (e) => {
    updatePointer(e.clientX, e.clientY);
    checkHover();
  });
}

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
      if (hoveredCard) {
        hoveredCard.userData.hoverActive = false;
        hoveredCard.material.opacity = 1;
      }
      hoveredCard = card;
      card.userData.hoverActive = true;
      card.material.opacity = 0.5;
      renderer.domElement.style.cursor = 'pointer';
      const { title, tagline } = card.userData.project;
      labelEl.innerHTML = `<span class="label-title">${title}</span>${tagline ? `<span class="label-tagline">${tagline}</span>` : ''}`;
    }
    // Project 3D card position to 2D screen coords
    const pos = card.position.clone().project(camera);
    labelEl.style.left = ((pos.x * 0.5 + 0.5) * window.innerWidth) + 'px';
    labelEl.style.top  = ((-pos.y * 0.5 + 0.5) * window.innerHeight) + 'px';
    labelEl.style.opacity = '1';
  } else {
    if (hoveredCard) {
      hoveredCard.userData.hoverActive = false;
      hoveredCard.material.opacity = 1;
      hoveredCard = null;
    }
    renderer.domElement.style.cursor = 'default';
    labelEl.style.opacity = '0';
  }
}

// ─── Filter buttons ───────────────────────────────────────────────────────────

function applySeqFilter(category) {
  // Sidebar nav items: dim non-matching
  seqView.querySelectorAll('.seq-nav-item').forEach((item) => {
    const slug = item.dataset.slug;
    const p = projects.find((pr) => pr.slug === slug);
    const cat = p && p.category;
    const match = category === 'all' || (cat && (Array.isArray(cat) ? cat.includes(category) : cat === category));
    item.classList.toggle('seq-nav-item--dimmed', !match);
  });
  // Scroll sections: hide non-matching
  seqView.querySelectorAll('.seq-project').forEach((section) => {
    const slug = section.id.replace('seq-', '');
    const p = projects.find((pr) => pr.slug === slug);
    const cat = p && p.category;
    const match = category === 'all' || (cat && (Array.isArray(cat) ? cat.includes(category) : cat === category));
    section.classList.toggle('seq-project--hidden', !match);
  });
}

document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.category;
    document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
    // 'all' clears all active states — no button highlighted, all cards visible
    if (category !== 'all') btn.classList.add('active');
    applyFilter(cards, category);
    applySeqFilter(category);
    seqView.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ─── View toggle (spatial / sequential) ──────────────────────────────────────

import { projects } from './projects.js';

const sequentialOrder = [
  'archive', 'were-you-here', 'fire-of-transformation', 'trans-intelligence', 'odyssey',
  'machine-nostalgia', 'k41', 'id',
];

// Build the ordered list: specified order first, then the rest
const orderedProjects = [
  ...sequentialOrder.map((s) => projects.find((p) => p.slug === s)).filter(Boolean),
  ...projects.filter((p) => !sequentialOrder.includes(p.slug)),
];

function figureHTML(item) {
  const src = typeof item === 'string' ? item : item.src;
  const caption = typeof item === 'string' ? '' : (item.caption || '');
  const half = (typeof item === 'object' && item.half) ? ' project-figure--half' : '';
  return `<figure class="project-figure${half}">
    <img src="${src}" alt="" loading="lazy"
      onload="this.parentElement.style.setProperty('--ar', this.naturalWidth / this.naturalHeight)"
      onerror="this.parentElement.style.display='none'" />
    ${caption ? `<figcaption>${caption}</figcaption>` : ''}
  </figure>`;
}

function renderSeqProject(p) {
  const linksHTML = (p.links || [])
    .map((l) => `<a class="project-link-btn" href="${l.url}" target="_blank">${l.label}</a>`)
    .join('');
  const videosHTML = (p.videos || [])
    .map((v) => `<div class="video-wrap"><iframe src="${v}" allowfullscreen></iframe></div>`)
    .join('');

  let bodyHTML = '';

  if (p.layout === 'featured') {
    const leftCount = p.featuredLeftCount ?? 1;
    const leftImages = (p.images || []).slice(0, leftCount);
    const rest = (p.images || []).slice(leftCount);
    bodyHTML = `
      <div class="layout-featured">
        <div class="featured-left">${leftImages.map(figureHTML).join('')}</div>
        <div class="featured-right">
          <div class="project-text">${p.text}</div>
          ${linksHTML}
        </div>
        ${rest.map(figureHTML).join('')}
      </div>
      ${videosHTML}`;
  } else if (p.layout === 'two-column') {
    const leftImgs = (p.leftImages || []).map(figureHTML).join('');
    const rightImgs = (p.rightImages || []).map(figureHTML).join('');
    bodyHTML = `
      <div class="layout-two-column">
        <div class="two-col-left">${leftImgs}</div>
        <div class="two-col-right">
          <div class="project-text">${p.text}</div>
          ${linksHTML}
          ${rightImgs}
        </div>
      </div>
      ${(p.images || []).length ? `<div class="project-gallery two-col-gallery">
        ${p.images.map(figureHTML).join('')}
      </div>` : ''}
      ${videosHTML}`;
  } else {
    bodyHTML = `
      <div class="project-text">${p.text}</div>
      ${linksHTML}
      ${(p.images || []).length ? `<div class="project-gallery${
        p.galleryLayout === 'justified' ? ' project-gallery--justified' : ''
      }">
        ${p.images.map(figureHTML).join('')}
      </div>${p.imagesCredit ? `<p class="project-gallery-credit">${p.imagesCredit}</p>` : ''}` : ''}
      ${videosHTML}`;
  }

  // A project that IS a website shows a poster here, never a live iframe —
  // an interactive frame inside this scrolling list would trap the wheel.
  // The full piece opens in its own tab.
  if (p.siteEmbed) {
    const s = p.siteEmbed;
    bodyHTML = `
      <div class="site-embed">
        <div class="site-embed-poster">
          ${s.hud ? `<div class="site-embed-hud">${s.hud}</div>` : ''}
          <div class="site-embed-meta">
            <span class="site-embed-title">${s.title || p.title}</span>
            ${s.subtitle ? `<span class="site-embed-sub">${s.subtitle}</span>` : ''}
          </div>
          <a class="site-embed-enter" href="${s.url}" target="_blank" rel="noopener">open the piece ↗</a>
          ${s.note ? `<p class="site-embed-note">${s.note}</p>` : ''}
        </div>
      </div>` + bodyHTML;
  }

  // Determine background type and build corresponding markup
  let bgClass = 'seq-project--light';
  let bgMarkup = '';
  let sectionStyle = '';

  if (p.videoBg) {
    bgClass = 'seq-project--video';
    bgMarkup = `<div class="seq-bg-fixed" data-iframe-src="${p.videoBg}"></div><div class="seq-bg-scrim"></div>`;
  } else if (p.imageBg) {
    bgClass = 'seq-project--image';
    bgMarkup = `<div class="seq-bg-fixed" style="background: url('${p.imageBg}') center/cover no-repeat"></div><div class="seq-bg-scrim"></div>`;
  }

  return `<section class="seq-project ${bgClass}" id="seq-${p.slug}"${sectionStyle}>
    ${bgMarkup}
    <div class="seq-project-content">
      <div class="seq-title-block">
        <h2 class="seq-title">${p.title}</h2>
        <div class="seq-tagline">${p.tagline || p.category}</div>
      </div>
      <div class="seq-content">${bodyHTML}</div>
    </div>
  </section>`;
}

const seqView = document.getElementById('sequential-view');
const navItems = orderedProjects.map((p) =>
  `<a class="seq-nav-item" href="#seq-${p.slug}" data-slug="${p.slug}">${p.title}</a>`
).join('');
// The progress bar is drawn as a rule on each title (.seq-nav-item::before),
// not as a separate column — that way every segment is exactly as tall as its
// own title and the two can never drift out of alignment.
seqView.innerHTML = `
  <nav class="seq-sidebar">${navItems}</nav>
  <div class="seq-inner">${orderedProjects.map(renderSeqProject).join('')}</div>`;

// Lazy-mount video iframes: insert the iframe only when its section is near the
// viewport, remove it when scrolled far away. Keeps DOM light during scroll —
// otherwise ~11 autoplaying iframes recompute on every fixed-position scroll frame.
//
// Observe the SECTION, not the .seq-bg-fixed layer. The layer is
// position: fixed, so its containing block is the viewport — and an
// IntersectionObserver with an element root only reports intersections when
// the root is in the target's containing-block chain. #sequential-view has no
// transform, so it never is: observing the layer directly reports false
// forever and the video never mounts. The section is in normal flow, so it
// intersects correctly.
const iframeObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const el = entry.target.querySelector('.seq-bg-fixed[data-iframe-src]');
    if (!el) continue;
    if (entry.isIntersecting) {
      if (!el.firstChild) {
        const iframe = document.createElement('iframe');
        iframe.src = el.dataset.iframeSrc;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'autoplay; encrypted-media; picture-in-picture');
        iframe.setAttribute('allowfullscreen', '');
        el.appendChild(iframe);
      }
    } else if (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  }
}, {
  root: seqView,
  rootMargin: '200% 0px',
  threshold: 0,
});
seqView.querySelectorAll('.seq-project').forEach((section) => {
  if (section.querySelector('.seq-bg-fixed[data-iframe-src]')) iframeObserver.observe(section);
});

// Mark one project as the one being read: its segment on the left-hand bar goes
// to full white, and its title in the list brightens.
function setActiveSeqProject(slug) {
  seqView.querySelectorAll('.seq-nav-item').forEach((item) => {
    item.classList.toggle('seq-nav-item--active', item.dataset.slug === slug);
  });
}

// Mark whichever section currently crosses the viewport centre as .in-view, so
// only its (position:fixed) bg + scrim are at opacity 1. Prevents multiple
// fixed bgs stacking — the bug that made GeoPlant's bg dominate on mobile.
const inViewObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
    // Light this project's segment on the left-hand bar, and its title in the list.
    if (entry.isIntersecting) setActiveSeqProject(entry.target.id.replace('seq-', ''));
  }
}, {
  root: seqView,
  rootMargin: '-50% 0px -50% 0px',  // only the centre line of the viewport counts
});
seqView.querySelectorAll('.seq-project').forEach((s) => inViewObserver.observe(s));

// Scroll the sequential container to a section, and keep it there.
//
// offsetTop is only valid for the instant it is read. Every section above the
// target holds images with loading="lazy" and no reserved height, so as the
// scroll travels past them they load, the content above the target grows, and
// the animation finishes thousands of pixels short — measured at ~16,800px for
// the last project in the list. So after the scroll settles, re-align until the
// target's position stops moving.
function scrollSeqTo(target) {
  seqView.scrollTo({ top: target.offsetTop, behavior: 'smooth' });

  let cancelled = false;
  const cancel = () => { cancelled = true; };
  const cleanup = () => {
    seqView.removeEventListener('wheel', cancel);
    seqView.removeEventListener('touchstart', cancel);
  };
  // If the visitor starts scrolling themselves, stop correcting.
  seqView.addEventListener('wheel', cancel, { passive: true });
  seqView.addEventListener('touchstart', cancel, { passive: true });

  const realign = () => {
    const deadline = performance.now() + 6000;
    let stable = 0;
    const step = () => {
      if (cancelled) return cleanup();
      const top = target.offsetTop;
      if (Math.abs(seqView.scrollTop - top) > 2) {
        // 'instant', not 'auto' — the container sets scroll-behavior: smooth in
        // CSS, and 'auto' would defer to it and animate each correction.
        seqView.scrollTo({ top, behavior: 'instant' });
        stable = 0;
      } else {
        stable += 1;
      }
      if (stable < 12 && performance.now() < deadline) requestAnimationFrame(step);
      else cleanup();
    };
    requestAnimationFrame(step);
  };

  // Correct once the initial animation has finished, so it isn't cut short.
  let fired = false;
  const runOnce = () => { if (!fired) { fired = true; realign(); } };
  seqView.addEventListener('scrollend', runOnce, { once: true });
  setTimeout(runOnce, 900); // fallback where scrollend is unsupported
}

// Sidebar click → smooth scroll to project section within the sequential container
const seqSidebar = seqView.querySelector('.seq-sidebar');
seqSidebar.addEventListener('click', (e) => {
  const link = e.target.closest('.seq-nav-item');
  if (!link) return;
  e.preventDefault();
  const target = seqView.querySelector(`#seq-${link.dataset.slug}`);
  if (target) scrollSeqTo(target);
  // On mobile, close the sidebar after selecting a project
  seqSidebar.classList.remove('open');
});

// Mobile: "index" link toggles sidebar in sequential view
const indexLink = document.querySelector('.nav-left a[href="/"]');
indexLink.addEventListener('click', (e) => {
  if (window.innerWidth <= 600 && seqView.classList.contains('active')) {
    e.preventDefault();
    seqSidebar.classList.toggle('open');
  }
});

// Dismiss sidebar when tapping outside it on mobile
seqView.addEventListener('click', (e) => {
  if (seqSidebar.classList.contains('open') && !seqSidebar.contains(e.target)) {
    seqSidebar.classList.remove('open');
  }
});

document.querySelectorAll('.view-toggle').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.view-toggle').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const view = btn.dataset.view;
    if (view === 'sequential') {
      document.getElementById('card-label').style.display = 'none';
      cards.forEach((c) => { c.visible = false; });
      persistentLabels.forEach(({ el }) => { el.style.display = 'none'; });
      seqView.classList.add('active');
    } else {
      document.getElementById('card-label').style.display = '';
      cards.forEach((c) => { c.visible = true; });
      persistentLabels.forEach(({ el }) => { el.style.display = ''; });
      seqView.classList.remove('active');
    }
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

  if (!introDone) {
    const t = Math.min(1, (performance.now() - introStartTime) / INTRO_DURATION_MS);
    const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
    camera.position.z = introStartZ + (startZ - introStartZ) * eased;
    if (t >= 1) {
      introDone = true;
      controls.enabled = true;
      hideZoomHint();
    }
  }

  controls.update();              // apply damping to camera movement

  // Clamp pan to the card spread bounds (computed at load time from actual screen size)
  if (camera.position.x >  spreadX) { camera.position.x =  spreadX; controls.target.x =  spreadX; }
  else if (camera.position.x < -spreadX) { camera.position.x = -spreadX; controls.target.x = -spreadX; }
  if (camera.position.y >  spreadY) { camera.position.y =  spreadY; controls.target.y =  spreadY; }
  else if (camera.position.y < -spreadY) { camera.position.y = -spreadY; controls.target.y = -spreadY; }
  animateFilters(cards);          // smoothly animate filter opacity/scale

  // Mobile: reproject each card's label to its current screen position
  // and sync label opacity with the card's filter opacity
  if (isTouch) {
    persistentLabels.forEach(({ el, card }) => {
      const pos = card.position.clone().project(camera);
      el.style.left = ((pos.x * 0.5 + 0.5) * window.innerWidth) + 'px';
      el.style.top  = ((-pos.y * 0.5 + 0.5) * window.innerHeight) + 'px';
      el.style.opacity = card.material.opacity;
    });
  }

  // Render 3D model thumbnails to their render targets
  modelThumbs.forEach(({ model, rtScene, rtCamera, renderTarget }) => {
    model.rotation.y += 0.005;
    renderer.setRenderTarget(renderTarget);
    renderer.render(rtScene, rtCamera);
  });
  renderer.setRenderTarget(null);

  renderer.render(scene, camera);
}

animate();

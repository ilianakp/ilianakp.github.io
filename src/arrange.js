// arrange.js — spatial arrangements for the 3D index.
//
// Cards keep the hand-placed position they were built with ("free"). Every
// other mode computes a target position per card and the scene lerps toward it,
// the same way filters.js lerps opacity and scale.
//
//   free           the composed collage in cards.js — the default
//   chronological  a timeline: one column per year, oldest at the left
//   medium         cards gather into labelled regions, one per medium
//   shuffle        re-scattered at random
//
// Arrangements lay out only the cards the active tag filter leaves visible, so
// a filtered scene doesn't leave holes where the hidden cards would have been.

export const MEDIA_ORDER = [
  'software',
  'installation',
  'video & animation',
  'publication',
  'talks & workshops',
  'images & physical prototypes',
];

const targets = new Map(); // mesh → { x, y, z, scale }
let ctx = null;            // { spreadX, spreadY, cardMax, navOffset, visibleHalfW, visibleHalfH }

// Arrangements lay out inside the viewport, not the wider pan spread, so a
// sort never starts with its first or last group off the edge of the screen.
const frameW = () => ctx.visibleHalfW * 2;
const frameH = () => ctx.visibleHalfH * 2;

export function initArrange(cards, context) {
  ctx = context;
  cards.forEach((card) => {
    card.userData.home = card.position.clone();
    targets.set(card, { ...card.position.clone(), scale: 1 });
  });
}

const atHome = (card, scale = 1) => ({ ...card.userData.home, scale });

function matches(card, category) {
  const cat = card.userData.project.category;
  if (category === 'all') return true;
  return Array.isArray(cat) ? cat.includes(category) : cat === category;
}

// Place a group of cards inside a rectangular region as a small jittered grid.
function layOutRegion(group, cx, cy, regionW, regionH, zBase) {
  const n = group.length;
  if (!n) return;
  const cols = Math.ceil(Math.sqrt(n));
  const rows = Math.ceil(n / cols);
  const stepX = regionW / (cols + 0.35);
  const stepY = regionH / (rows + 0.75);
  // Cards are composed to fill the whole screen, so at full size they would
  // swamp a region. Shrink them to the cell they now have to live in.
  const scale = Math.max(0.3, Math.min(1, (Math.min(stepX, stepY) / ctx.cardMax) * 0.92));

  group.forEach((card, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    // Deterministic per-card wobble so a region never looks like a table.
    const seed = card.userData.index * 2.399963;
    const jx = Math.sin(seed) * stepX * 0.16;
    const jy = Math.cos(seed * 1.7) * stepY * 0.16;
    targets.set(card, {
      x: cx + (col - (cols - 1) / 2) * stepX + jx,
      y: cy - (row - (rows - 1) / 2) * stepY + jy,
      z: zBase + Math.sin(seed * 3.1) * 12,
      scale,
    });
  });
}

// Returns the cluster headings to draw, as [{ label, x, y, z }].
export function setArrangement(cards, mode, category) {
  const visible = cards.filter((c) => matches(c, category));
  const hidden = cards.filter((c) => !matches(c, category));

  // Cards the filter has dimmed stay where they are; they're at 8% opacity.
  hidden.forEach((c) => targets.set(c, atHome(c)));

  if (mode === 'free') {
    cards.forEach((c) => targets.set(c, atHome(c)));
    return [];
  }

  if (mode === 'chronological') {
    // A timeline: one column per year, oldest at the left. Cards stack inside
    // their year, so the reading is a line across the screen rather than depth.
    const years = [...new Set(visible.map((c) => c.userData.project.year ?? 0))].sort((a, b) => a - b);
    const usableW = frameW() * 0.94;
    const usableH = frameH() * 0.70;
    const colW = usableW / years.length;
    const tallest = Math.max(...years.map((y) => visible.filter((c) => c.userData.project.year === y).length));
    const rowH = usableH / Math.max(1, tallest);
    const scale = Math.max(0.28, Math.min(1, (Math.min(colW, rowH) / ctx.cardMax) * 0.9));

    years.forEach((year, col) => {
      const group = visible.filter((c) => c.userData.project.year === year);
      const cx = -usableW / 2 + colW * (col + 0.5);
      group.forEach((card, row) => {
        targets.set(card, {
          x: cx,
          y: usableH / 2 - rowH * (row + 0.5) - ctx.navOffset,
          z: -20,
          scale,
        });
      });
    });

    return years.map((year, col) => ({
      label: String(year),
      x: -usableW / 2 + colW * (col + 0.5),
      y: usableH / 2 + rowH * 0.22 - ctx.navOffset,
      z: -20,
    }));
  }

  if (mode === 'shuffle') {
    visible.forEach((card) => {
      targets.set(card, {
        x: (Math.random() * 2 - 1) * ctx.visibleHalfW * 0.88,
        y: (Math.random() * 2 - 1) * ctx.visibleHalfH * 0.66 - ctx.navOffset * 0.5,
        z: -90 + Math.random() * 100,
        scale: 1,
      });
    });
    return [];
  }

  if (mode === 'medium') {
    const groups = MEDIA_ORDER
      .map((label) => ({ label, items: visible.filter((c) => c.userData.project.medium === label) }))
      .filter((g) => g.items.length);

    const cols = Math.min(3, groups.length);
    const rows = Math.ceil(groups.length / cols);
    const usableW = frameW() * 0.94;
    const usableH = frameH() * 0.74;
    const regionW = usableW / cols;
    const regionH = usableH / rows;

    return groups.map((group, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cx = -usableW / 2 + regionW * (col + 0.5);
      const cy = usableH / 2 - regionH * (row + 0.5) - ctx.navOffset;
      layOutRegion(group.items, cx, cy, regionW, regionH, -30);
      return { label: group.label, x: cx, y: cy + regionH * 0.42, z: -30 };
    });
  }

  return [];
}

export function animateArrange(cards) {
  const speed = 0.06; // lerp factor — matches the filter fade's pace
  cards.forEach((card) => {
    const t = targets.get(card);
    if (!t) return;
    card.position.x += (t.x - card.position.x) * speed;
    card.position.y += (t.y - card.position.y) * speed;
    card.position.z += (t.z - card.position.z) * speed;
    const s = t.scale ?? 1;
    card.scale.x += (s - card.scale.x) * speed;
    card.scale.y += (s - card.scale.y) * speed;
  });
}

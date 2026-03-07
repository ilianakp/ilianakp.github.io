// filters.js — category filter logic
//
// When you click a filter button, non-matching cards fade out and shrink.
// We animate opacity and scale by lerping toward target values each frame —
// similar to Lerp() in Unity Update().

// Target values for each card (set when filter changes)
const targets = new Map(); // mesh → { opacity: 1, scale: 1 }

export function initTargets(cards) {
  cards.forEach((card) => {
    targets.set(card, { opacity: 1, scale: 1 });
  });
}

// Called when user clicks a filter button
export function applyFilter(cards, activeCategory) {
  cards.forEach((card) => {
    const { project } = card.userData;
    const visible = activeCategory === 'all' || project.category === activeCategory;
    const t = targets.get(card);
    t.opacity = visible ? 1 : 0.08;
    t.scale = visible ? 1 : 0.6;
  });
}

// Call this every frame — smoothly lerps cards toward their targets
export function animateFilters(cards) {
  const speed = 0.08; // lerp factor (0=no movement, 1=instant)
  cards.forEach((card) => {
    const t = targets.get(card);
    if (!t) return;

    // Lerp opacity
    const mat = card.material;
    mat.opacity += (t.opacity - mat.opacity) * speed;

    // Lerp scale (uniform)
    card.scale.x += (t.scale - card.scale.x) * speed;
    card.scale.y += (t.scale - card.scale.y) * speed;
  });
}

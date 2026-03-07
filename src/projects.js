// ─── Project data ─────────────────────────────────────────────────────────────
//
// Each project is one object. Fields:
//   slug        — URL identifier: /project.html?id=slug
//   title       — display title
//   category    — 'interactive' | 'data&visuals' | 'research'
//   thumbnail   — path to the card image shown in the 3D scene (/public/images/...)
//   text        — HTML string shown at the top of the project page (can include <a> tags)
//   links       — array of { label, url } shown as pill buttons (use for external links)
//   images      — array of image paths shown in the gallery (/public/images/[slug]/...)
//   videos      — array of YouTube/Vimeo embed URLs (shown as iframes)
//
// To add content: fill in text, links, images, videos for each project.
// Images go in /public/images/[slug]/ — name them anything you like.

export const projects = [
  {
    slug: 'odyssey',
    title: 'Odyssey',
    category: 'interactive',
    thumbnail: '/images/odyssey/thumb.jpg',
    text: `<p>Music album, visuals &amp; technology.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'data-poetics',
    title: 'Data Poetics',
    category: 'data&visuals',
    thumbnail: '/images/data-poetics/thumb.jpg',
    text: `<p>MArch thesis exploring the poetics of data visualization.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'k41',
    title: 'K41',
    category: 'interactive',
    thumbnail: '/images/k41/thumb.jpg',
    text: `<p>Events.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'dynitiko',
    title: 'Dynitikó',
    category: 'interactive',
    thumbnail: '/images/dynitiko/thumb.jpg',
    text: `<p>Interactive installation.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'id',
    title: 'ID',
    category: 'data&visuals',
    thumbnail: '/images/id/thumb.jpg',
    text: `<p>Editorial design.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: '3d-scanning',
    title: 'An exploration of 3D scanning as spatial memory',
    category: 'research',
    thumbnail: '/images/3d-scanning/thumb.jpg',
    text: `<p>Text-based research exploring 3D scanning as a medium to record spatial memory.</p>`,
    links: [
      {
        label: 'Read publication',
        url: 'https://adk.elsevierpure.com/en/publications/an-exploration-of-3d-scanning-as-a-medium-to-record-spatial-memor',
      },
    ],
    images: [],
    videos: [],
  },
  {
    slug: 'machine-nostalgia',
    title: 'Machine nostalgia',
    category: 'interactive',
    thumbnail: '/images/machine-nostalgia/thumb.jpg',
    text: `<p>Interactive artwork.</p>`,
    links: [
      {
        label: 'View project',
        url: 'https://bpro2021.bartlettarchucl.com/architectural-computation/xudong-liu-iliana-papadopoulou-tengfei-zhang',
      },
    ],
    images: [],
    videos: [],
  },
  {
    slug: 'shudder',
    title: 'shudder~shutter~shatter',
    category: 'data&visuals',
    thumbnail: '/images/shudder/thumb.jpg',
    text: `<p>Video art.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'geoplant',
    title: 'GeoPlant',
    category: 'research',
    thumbnail: '/images/geoplant/thumb.jpg',
    text: `<p>Research &amp; web tool.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'were-you-here',
    title: 'were you here',
    category: 'interactive',
    thumbnail: '/images/were-you-here/thumb.jpg',
    text: `<p>Interactive artwork.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'penumbra',
    title: 'Penumbra',
    category: 'data&visuals',
    thumbnail: '/images/penumbra/thumb.jpg',
    text: `<p>Visuals.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'archive',
    title: 'ARchive',
    category: 'research',
    thumbnail: '/images/archive/thumb.jpg',
    text: `<p>MSc thesis — Architectural Computation, The Bartlett School of Architecture, UCL.</p>`,
    links: [
      {
        label: 'View thesis',
        url: 'https://bpro2021.bartlettarchucl.com/architectural-computation/iliana-papadopoulou',
      },
    ],
    images: [],
    videos: [],
  },
  {
    slug: 'trans-intelligence',
    title: 'Trans-intelligence',
    category: 'research',
    thumbnail: '/images/trans-intelligence/thumb.jpg',
    text: `<p>Text &amp; images.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'here-but-when',
    title: 'HERE BUT WHEN',
    category: 'research',
    thumbnail: '/images/here-but-when/thumb.jpg',
    text: `<p>Research.</p>`,
    links: [
      {
        label: 'View project',
        url: 'https://demos.mediaarchitecture.org/mab/project/22',
      },
    ],
    images: [],
    videos: [],
  },
];

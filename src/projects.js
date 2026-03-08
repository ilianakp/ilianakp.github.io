// ─── Project data ─────────────────────────────────────────────────────────────
//
// Each project is one object. Fields:
//   slug        — URL identifier: /project.html?id=slug
//   title       — display title
//   category    — 'interactive' | 'data&visuals' | 'research'
//   thumbnail   — path to the card image shown in the 3D scene (/public/images/...)
//   text        — HTML string shown at the top of the project page (can include <a> tags)
//   links       — array of { label, url } shown as pill buttons (use for external links)
//   videoBg     — optional Vimeo/YouTube embed URL: plays as full-width hero at top of page
//   images      — array of image paths OR { src, caption } objects for the gallery
//   tagline     — short plain-text description shown under title on hover in 3D scene
//   videos      — array of YouTube/Vimeo embed URLs (shown as iframes below images)
//
// To add content: fill in text, links, images, videos for each project.
// Images go in /public/images/[slug]/ — name them anything you like.

export const projects = [
  {
    slug: 'odyssey',
    title: 'Odyssey',
    category: 'interactive',
    tagline: 'Music album, visuals & technology',
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
    tagline: 'MArch thesis',
    thumbnail: '/images/data-poetics/thumb.png',
    text: `<p>MArch thesis exploring the poetics of data visualization.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'k41',
    title: 'K41',
    category: 'interactive',
    tagline: 'Events',
    thumbnail: '/images/k41/thumb.png',
    text: `<p>Events.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'dynitiko',
    title: 'Dynitikó',
    category: 'interactive',
    tagline: 'Interactive installation',
    thumbnail: '/images/dynitiko/thumb.png',
    text: `<p>Interactive installation.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'id',
    title: 'ID',
    category: 'data&visuals',
    tagline: 'Editorial design',
    thumbnail: '/images/id/thumb.png',
    text: `<p>Editorial design.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: '3d-scanning',
    title: 'An exploration of 3D scanning as spatial memory',
    category: 'research',
    tagline: 'Research & publication',
    thumbnail: '/images/3d-scanning/thumb.png',
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
    tagline: 'Interactive artwork',
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
    tagline: 'Video art',
    thumbnail: '/images/shudder/thumb.png',
    text: `<p>Video art.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'geoplant',
    title: 'GeoPlant',
    category: 'research',
    tagline: 'Research & web tool',
    thumbnail: '/images/geoplant/thumb.png',
    text: `<p>Research &amp; web tool.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'were-you-here',
    title: 'were you here',
    category: 'interactive',
    tagline: 'Interactive artwork',
    thumbnail: '/images/were-you-here/thumb.png',
    text: `<p>Interactive artwork.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'penumbra',
    title: 'Penumbra',
    category: 'data&visuals',
    tagline: 'Visuals',
    thumbnail: '/images/penumbra/thumb.png',
    text: `<p>Visuals.</p>`,
    links: [],
    images: [],
    videos: [],
  },
  {
    slug: 'archive',
    title: 'ARchive',
    category: 'research',
    tagline: 'MSc thesis, The Bartlett UCL',
    thumbnail: '/images/archive/thumb.png',
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
    tagline: 'Prompt engineering, images, text',
    layout: 'featured',
    thumbnail: '/images/trans-intelligence/thumb.png',
    text: `
      <p><em>Contextual Mumbling</em><br>Copenhagen/Berlin 2022</p>
      <p>Prompt engineering, images, text<br>
      Published in <em>If Not Now Magazine, The Surface Issue</em></p>

      <p>Nature's state, by fact, has been predetermined as undesigned, since the development of the living world has been constructed driven by the natural prevailing forces. The existence of the human species has redirected the earth's development under its selfish dominion. Surfaces, once naturally formed, follow rules and patterns only to serve the preferences of humanity. Design has been a force to apply human thought into realities. Through the layers of intervention to the natural environment, we redefine its initial meaning. Mankind, the primary surface designer, has transformed earth into a collage of endless designed landscapes. Infrastructures have conquered the vast surface of the planet, from the scale of micro –microchips, artificial seeds etc.– to the scale of macro –planetary networks, the internet etc. But humans, not merely design. They have created machines with design means – artificial intelligence (AI) that can now take the role of the designer. We gradually passed from producing culture to producing entities that produce culture for us. Even though we are part of an ecosystem, we have come to pseudo-individualise our notions. We have created artificial egos that augment with material consumption and complete detachment from the origin. Could AI guide us back to the start and articulate the concept of things?</p>

      <p>In this context, we, at Contextual Mumbling, aim to explore the notion of the natural as undesigned through artificial design intelligence that could potentially close this production loop. Responding to the current issue, we used keywords extracted from the open-call's text, to produce images with a GAN (Generative Adversarial Network) that correspond to our individual meanings of the undesigned — made from AI itself.</p>

      <p><em>From text, to image, to culture.</em></p>
    `,
    links: [],
    videoBg: 'https://player.vimeo.com/video/905113118?background=1&autoplay=1&loop=1&muted=1',
    images: [
      {
        src: '/images/trans-intelligence/gan-01.png',
        caption: `text_prompts = {0: ["ecosystems, oceans, pollution, minerals, impacts, bacteria, recycling, oyster, climate"]}`,
      },
      {
        src: '/images/trans-intelligence/gan-02.png',
        caption: `text_prompts = {0: ["mines, surface, pollution, soil, landscape, terrain, climate, volcanic, manufactured"]}`,
      },
      {
        src: '/images/trans-intelligence/gan-03.png',
        caption: `text_prompts = {0: ["manufactured world, climate change, green energy, diverse notions, plastic-free oceans, slow consumption, volcanic minerals, forest preservation, creative medium"]}`,
      },
    ],
    videos: [],
  },
  {
    slug: 'here-but-when',
    title: 'HERE BUT WHEN',
    category: 'research',
    tagline: 'Research',
    thumbnail: '/images/here-but-when/thumb.gif',
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

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
    slug: 'fire-of-transformation',
    title: 'Fire of Transformation',
    category: 'data&visuals',
    tagline: 'Animation and art installation',
    thumbnail: '/images/fire-of-transformation/thumbnail.png',
    videoBg: 'https://www.youtube.com/embed/uVnM8dclihM?autoplay=1&loop=1&mute=1&playlist=uVnM8dclihM&controls=0&showinfo=0',
    layout: 'featured',
    featuredLeftCount: 1,
    text: `
      <p>Animation and art installation<br>
      Exhibited at Artgate Project, Thessaloniki<br>
      Screened at Immaterial Film Club, Latraac Athens 2025<br>
      poem: Ornella Pacchioni<br>
      sound design, edit: birgif<br>
      cast: Marcus Kjellingbro<br>
      narration: Theodora project<br>

      Copenhagen, DK–Paris, FR, 2025</p>

      <p>An animation based on a poem that weaves together
      memories of people and places, fantastical objects, and the
      imaginary world of flora. It explores the evolution of the self
      through emotional connection and the discovery of sexuality.
      As abstract forms gradually take shape into defined figures, the
      animation reflects the passage from the ephemeral to the
      tangible, capturing moments of intimacy, exploration, and
      transformation while creating a dance within the text. The
      movement is intended to feel introspective — like entering
      one's own memory and navigating through it. Some images
      emerge directly from the poem's symbols, serving as a guiding
      thread, while others form more abstract associations. In this
      way, the animation becomes an exploration of emotional
      connectivity and self-evolution, embodying the poem's essence
      through emerging technologies such as volumetric scanning
      and digital sculpting.</p>
    `,
    links: [],
    images: [
      '/images/fire-of-transformation/IMG_7892.jpg',
      '/images/fire-of-transformation/s1.jpg',
      '/images/fire-of-transformation/s2.jpg',
      '/images/fire-of-transformation/s3.jpg',
      '/images/fire-of-transformation/s4.jpg',
      '/images/fire-of-transformation/IMG_4074.JPEG',
    ],
    videos: [],
  },
  {
    slug: 'odyssey',
    title: 'Odyssey',
    category: 'data&visuals',
    tagline: 'Music album, visuals & technology',
    thumbnail: '/images/odyssey/noise-pcl-02.png',
    layout: 'featured',
    featuredLeftCount: 2,
    text: `
      <p>Contextual Mumbling in collaboration with Pamp3000</p>

      <p>Copenhagen, Paris 2023<br>
      Roles: Creative Direction, EP Visual Identity, Music Video and Technology</p>

      <p>Odyssey is a music album by Theodora, an artist/producer based in Paris. For this project, Contextual Mumbling joined forces with the creative studio Pamp3000, based in Copenhagen, and co-directed the visual identity of the album's EP covers and music videos.</p>

      <p>The project's concept Odyssey derives from the journey and transformation of the artist throughout the album. The transformation of the hero, on a physical and emotional level, the mythology, in connection to the contemporary, the odyssey of the soul, a conversation with the spiritual. These themes are the ones that have guided our artistic narrative and approach to the EP.</p>

      <p>For the realization of this project, we are using a variety of technologically advanced mediums, such as volumetric recording and procedural geometrical processing to be used both for documentation and postproduction and manifest the conceptual idea of the project.</p>

      <p>Specifically about JOURS HEUREUX music video, the main character's fragmented memories are represented through a distorted temporal 3D scan, resembling the search of one's lost soul. We aimed to create a hybrid video which translates the intangible as the virtual.</p>

      <p>Music: Theodora project @theodoraproject<br>
      Art direction, Music video, Technology: Contextual Mumbling<br>
      Creative direction, production, post-editing: Pamp3000<br>
      Costume design @serenaclho</p>
    `,
    videoBg: 'https://www.youtube.com/embed/Kebwbwmbo4k?autoplay=1&loop=1&mute=1&playlist=Kebwbwmbo4k&controls=0&showinfo=0',
    links: [],
    images: [
      '/images/odyssey/featured-left.png',
      '/images/odyssey/featured-left-02.png',
      // '/images/odyssey/ep-cover.jpg',
      // '/images/odyssey/ep-cover-02.jpg',
      '/images/odyssey/still-01.png',
      '/images/odyssey/still-04.png',
      // '/images/odyssey/noise-pcl-01.png',
      '/images/odyssey/noise-pcl-02.png',
      // '/images/odyssey/noise-pcl-03.png',
    ],
    videos: [],
  },
  {
    slug: 'data-poetics',
    title: 'Data Poetics',
    category: 'data&visuals',
    tagline: 'MArch thesis',
    thumbnail: '/images/data-poetics/thumb.png',
    layout: 'featured',
    featuredLeftCount: 1,
    imageBg: '/images/data-poetics/bg-blurred.jpg',
    text: `
      <p>MArch, Aristotle University of Thessaloniki<br>
      School of Architecture<br>
      Thesis project<br>
      June 2018</p>
      <p>Supervisors: Anastasios Tellios, Stavros Vergopoulos</p>

      <p>In an ever-changing society of over exposure and extreme connectivity, data from human activity provide a new meaning of input into creative processes. 'Data poetics' explores the idea of organising information, creating new associations between different kinds of urban fragments. A focus on the outside, the urban geometry that practically defines the city scape is studied here. An elliptic character is evident due to the image-based reading and documenting of urban space, the flexible use of resolution and mapping manipulations. The result is an oblique application on the urban results of the legislative mechanism implemented to achieve dwelling building on such a scale, that is through a private, small-scale building enterprise. This is resulting by the practically complete absence of state housing initiatives in the 50s, 60s and 70s in greek cities, exactly the opposite to european practices, both western and eastern, combined with the underlying urban palimpsest, which is centuries old. The research reveals episodes in the city, hidden within everyday life events. This becomes the base of abstract design scenarios for the future, addressing contemporary issues of networking and collective action, that invigorate the city in an almost arbitrary, not designed way.</p>

      <p>Drawings presented are not composed of lines, but of points. These are points of architectural and urban space that have been documented through 3D scanning and image reconstruction procedures. This huge set of point clouds is disclosing unseen parts of interior and exterior space, which is part of the research agenda. These parts are titled as fragments, tools that are "connected" to the internet. Through the logic of tags or hashtags, data that relate to the fragments are extracted from Instagram and they are reconnecting to the fragments based on their primitive file format - x, y, z, r, g, b - text file.</p>

      <p>Literal and metaphorical transcriptions start to emerge, while at the same time visualisations become structures, spaces, experiences. The new reality of the simulacrum contains a map as an interactive representation.</p>
    `,
    links: [],
    images: [
      '/images/data-poetics/featured-left.jpg',
      '/images/data-poetics/cnc.jpg',
      '/images/data-poetics/trans.png',
      { src: '/images/data-poetics/a2-8.jpg', half: true },
      { src: '/images/data-poetics/map.jpg', half: true },
      { src: '/images/data-poetics/pointcloud.jpg', half: true },
      { src: '/images/data-poetics/connections.jpg', half: true },
      '/images/data-poetics/a4-8.jpg',
      '/images/data-poetics/resolution-gradient.jpg',
      '/images/data-poetics/photo.jpeg',
    ],
    videos: [],
  },
  {
    slug: 'k41',
    title: 'K41 events',
    category: 'interactive',
    tagline: 'Events',
    thumbnail: '/images/k41/k41-thumbnail.png',
    thumbScale: 0.5,
    layout: 'two-column',
    videoBg: 'https://www.youtube.com/embed/9J5-bY3oFvw?autoplay=1&loop=1&mute=1&playlist=9J5-bY3oFvw&controls=0&showinfo=0',
    text: `
      <p>K41 is a co-creative hub based in Copenhagen. It is run by a mixed group of architects, musicians, designers, artists and scientists. K41 is a place for meetings, debate and experimentation, an open space for mixed collaborations and experiences. Contextual Mumbling teams up every year with the K41 family, in order to curate weekend events and exhibitions, elaborating artists, performers, and designers from Copenhagen and across the world.</p>

      <h3>Remember when we met</h3>
      <p>Copenhagen, May 2022<br>
      Visual identity, Installation, Video art, Community</p>

      <p>A project with artists and creatives around the community to converse upon concepts related to fashion, visual culture and music to transcend together the established mediums for representation and communication.</p>

      <p>During the days preceding the public events, creatives from different backgrounds are brought together to stress the norms of their respective discipline and enrich their representations through collaboration. This process will climax to a 3 days event spanning May to July, where each day will engage performance art, words, music and visual culture to unfold the common concept. To reflect upon the relationship between human and society, technology and media.</p>

      <p>ON MAY 28TH, K41 invites everyone to explore the work of emerging designers and artists in the fields of fashion, visual culture, and performance. The event space is transformed into a maze of performative acts, products of experimentation and collaboration, that coexist autonomously in the universe of the house and invite the guests to informal participation. The works address concepts related to identity, intimacy and hybrid existence.</p>

      <h3>Impossible objects</h3>
      <p>Copenhagen, June 2023<br>
      Visual identity, Experimentations with digital mediums, Community</p>

      <p>For the last event, "Tell Me I Exist" with the topic "Impossible Objects", Artists and Designers from Copenhagen and beyond took over the space: exhibiting work, taking part in panel discussions, and creating conversations around materialization in the digital and physical world through textures, pixels, and words - exploring the limits of representation as well as imagination.</p>

      <p>Impossible Objects is about looking at the creative process beyond the constraints of feasibility, functionality, and efficiency. They are experiments, accidents, works-in-progress, unpredictable successes. Design is here imagined as a tool for resistance and representation, a vehicle of communicating yet-unformulated emotions and unrefined ideas. Through the exploration of impossibility, how can we free creative practice into infinite paths?</p>
    `,
    leftImages: [
      '/images/k41/left-02.jpg',
      '/images/k41/left-01.jpg',
      '/images/k41/left-03.png',
      '/images/k41/left-04.jpg',
    ],
    rightImages: [
      '/images/k41/right-01.jpg',
      '/images/k41/right-02.jpg',
    ],
    links: [],
    images: [
      { src: '/images/k41/post-1.jpg', half: true },
      { src: '/images/k41/post-2.jpg', half: true },
      { src: '/images/k41/post-3.jpg', half: true },
      { src: '/images/k41/post-4.jpg', half: true },
    ],
    videos: [],
  },
  {
    slug: 'dynitiko',
    title: 'Dynitikó',
    category: 'interactive',
    tagline: 'Interactive installation',
    thumbnail: '/images/dynitiko/thumb.png',
    imageBg: '/images/dynitiko/bg.jpg',
    layout: 'featured',
    featuredLeftCount: 1,
    text: `
      <p>Copenhagen 2022 with Contextual Mumbling<br>
      Submission at Copenhagen Contemporary<br>
      ︎︎︎Yet it moves</p>

      <p>Quantum physics has brought a new perspective on the way we perceive the world around us. The quantum mechanical description of reality is based on the concept of probabilities. Quantum superposition allows for a physical system to potentially be in many alternative states simultaneously, for instance a particle occupying many different positions at the same time. While systems naturally exist in a superposition of states, it is the very act of observation that stochastically determines which of these states will be detected.</p>

      <p>As humans, we all are part of a constantly flowing and intricately entangled complex of interactions that takes place in the different environments we move across in our daily lives. In this sense, our modern interconnected society, especially in the urban context, mimics the concept of quantum entanglement between the observer and the subject of observation. In a way, we can be thought of as rendering machines that collect information from the surrounding reality, while filtering and processing it through neural and psychological processes to then translate it to our world experience.</p>

      <p>Every species on this planet has different sensorial and cognitive processes. Analogously, contemporary documentation mediums each involve characteristic (specific) stages through which the information is elaborated, as it flows from the subject of observation to the observer. We have new ways of remapping this aspect of human perception into corresponding digital spatial detection procedures, and exploring the concepts of potentiality and non-localization.</p>
    `,
    links: [],
    images: [
      '/images/dynitiko/render_red_square.jpeg',
      '/images/dynitiko/installation-diagram.jpg',
      '/images/dynitiko/connection-diagram.png',
    ],
    videos: [],
  },
  {
    slug: 'id',
    title: 'ID',
    category: 'interactive',
    tagline: 'Set design & technology',
    thumbnail: '/images/id/thumb.png',
    layout: 'featured',
    featuredLeftCount: 1,
    videoBg: 'https://player.vimeo.com/video/852430217?background=1&autoplay=1&loop=1&muted=1',
    text: `
      <p>Contextual Mumbling<br>
      June 2022<br>
      Role: Set Design, Production and Technology</p>

      <p>Contextual mumbling created both a physical and a digital set design, overlapping the two worlds, where the performers were able to interact with both sides through the mobile phones and the screens. The live AR from the devices was mirrored on the installation's screens.</p>

      <p>Serena Coelho (1994, Brazil), ID, 2022 As part of a personal journey transitioning from male to a femme form, Serena Coelho's work explores identity from a non-binary and non-Eurocentric perspective. The work was conceived during Coelho's own transition and is deeply rooted in the complexity of breaking off former identity expression to give way to a new one, and their connection. The project is embedded in a hybrid body in transformation, fluidity and liquid form, which materialises into "liquid colour flow" prints, deconstructed body suits with printed messages, and 3D printed sculptures and hand-sculpted pieces in recycled plastic where heat is applied to shape the material into a new form.</p>
    `,
    links: [],
    images: [
      '/images/id/img-2348-heic.jpeg',
      { src: '/images/id/dsf-8266.jpeg', half: true },
      { src: '/images/id/dsf-8304.jpeg', half: true },
      { src: '/images/id/img-2348.jpeg', half: true },
      { src: '/images/id/img-2349.jpeg', half: true },
      { src: '/images/id/dsf-8366.jpeg', half: true },
      { src: '/images/id/dsf-8375.jpeg', half: true },
    ],
    videos: [],
  },
  {
    slug: '3d-scanning',
    title: 'An exploration of 3D scanning as spatial memory',
    category: 'research',
    tagline: 'Research & publication',
    thumbnail: '/images/3d-scanning/thumb.png',
    thumbScale: 0.6,
    imageBg: '/images/3d-scanning/bg.jpg',
    text: `
      <p>An exploration of 3D scanning as a medium to record spatial memory and form an inhabitable archive through space and time</p>

      <p>Iliana Papadopoulou, Ava Fatah Gen. Schieck, Sam Griffiths</p>

      <p>EAEA16: Envisioning Architectural Scales in the Analogue and Virtual Representation of Architecture — Royal Danish Academy – Architecture, Design, Conservation, Copenhagen, Denmark<br>
      30 Aug 2023 → 1 Sept 2023</p>

      <p>Papadopoulou, Iliana; Fatah Gen. Schieck, Ava; Griffiths, Sam.</p>

      <p>This paper explores a process to archive spatial memory; from recording by 3D scanning, decluttering, sorting and finally representing and communicating information. It builds upon a background and theoretical framing, vital foundation to place it contextually and socially. In the dual character of the paper, foundation and case study of the proposed system are equally important, contributing on different levels of the same topic. The background is based on how technical apparatuses are a non-distinctive part of contemporary human life. They define the means and limitations of recording and representing information, and by extension affect how memory is sustained through time. They are instruments which make information readable and graspable and in some cases represented as an image. These images, or by using Flusser's more descriptive term, technical images (Flusser 2011, 23), are affecting our memory of past events and define how culture is sustained through time, as if our memory of space is also affected by the means of which we record it. Similarly to Stiegler's theory on the evolution of prosthesis, smartphones are the extension of hands (Stiegler 1998, 50); an a-live medium of recording, and source of retrieving information, forming a technical life increasingly available. Not that long ago in 2020, another generation of smartphones was introduced by Apple with an integrated LiDAR scanner (Apple, 2020). This 3D scanner can be therefore available to capture real time spatial data and it is considered as part of the archival medium genealogy. These mediums have an incorporated selection of the physical characteristics that are recorded and they define different perspectives of historical data. Specifically, 3D scanning, in the form of Point Clouds (PCLs), consists of two basic types of information: position and color, which after performing some basic operations are expressed as computational geometry and texture respectively (Fernandez-Diaz et al., 2007). These features are directly linked to time as they are affected by lightning conditions, reflections and all other parameters which affect the visual appearance of space.</p>

      <h3>References</h3>
      <p class="references">
      Apple (2020) iPhone 12 Pro and 12 Pro Max - Technical Specifications.<br>
      Bearman, D. (1989) ARCHIVAL METHODS: Archives and Museum Informatics Technical Report.<br>
      Derrida, J. (1989) Edmund Husserl's Origin of Geometry: An Introduction.<br>
      Ernst, W. (2017) The Delayed Present: Media-Induced Tempor(e)alities et Technotraumatic Irritations of "the Contemporary". Sternberg Press.<br>
      Fernandez-Diaz, J. et al. (2007) An Overview of Lidar Point Cloud Processing. Geosensing Engineering and Mapping.<br>
      Flusser, V. (2011) Into the Universe of Technical Images. University of Minnesota Press.<br>
      May, J. (2019) Signal, Image, Architecture. Columbia Books on Architecture and the City.<br>
      Nurdin, L. (2021) Archives as Information Infrastructure and Their Urgency Towards Research. Khizanah al-Hikmah, 9(1), p. 28.<br>
      Papadopoulou, I., Somasundaram, S. and Fatah gen Schieck, A. (2020) Here but when: The archive across space and time. Media Architecture Biennale.<br>
      Rovelli, C. (2018) The Order of Time. Riverhead Books.<br>
      Stiegler, B. (1998) Technics and Time, 1: The Fault of Epimetheus. Stanford University Press.<br>
      Stiegler, B. (2009) Technics and Time 2: Disorientation. Stanford University Press.<br>
      Terrone, E. (2018) The Medium is the Archive. Law Text Culture, pp. 31–38.
      </p>
    `,
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
    videoBg: 'https://www.youtube.com/embed/kDrnmGJ0SVo?autoplay=1&loop=1&mute=1&playlist=kDrnmGJ0SVo&controls=0&showinfo=0',
    layout: 'featured',
    featuredLeftCount: 0,
    text: `
      <p>The Bartlett School of Architecture<br>
      Exhibited in Media Architecture Biennale & BPro Show<br>
      London UK, 2021</p>

      <p>An Interactive Urban Experience integrating Algorithmic Errors as a Creative Input.</p>

      <p>Machine nostalgia explores a way to incorporate the emerging paradigm of machine errors into a playful and interactive experience. It combines the reduction of urban information into signals (x, y, z, R, G, B) with the exposure of dataset bias occurring from medium specific 3D scans. It wraps up with a game platform that allows you to create your own urban narrative by wandering in a city that rebuilds itself into a city of multiple cities and multiple identities. Your vision, position and movement is affecting the environment, while they are curated by the machine perception. There is no direct objective, other than the rearrangement of interrelations between urban elements.</p>

      <p>This project overall celebrates experimentation as an inherent part of architectural processes. This experimentation relies mostly on software and tools, using the ones created to prioritise efficiency in a serendipitous way. It mediates the image of the city as monumental and redefines it as the centre of the flux - a hyper connected entity with connections that are continuously updated.</p>
    `,
    links: [
      {
        label: 'View project',
        url: 'https://bpro2021.bartlettarchucl.com/architectural-computation/xudong-liu-iliana-papadopoulou-tengfei-zhang',
      },
    ],
    images: [
      '/images/machine-nostalgia/img-01.jpg',
      '/images/machine-nostalgia/img-03.jpg',
    ],
    videos: [],
  },
  {
    slug: 'archive',
    title: 'ARchive',
    category: ['interactive', 'research'],
    tagline: 'MSc thesis, The Bartlett UCL',
    thumbnail: '/images/archive/thumb.png',
    videoBg: 'https://www.youtube.com/embed/YMwLQ9-NuIY?autoplay=1&loop=1&mute=1&playlist=YMwLQ9-NuIY&controls=0&showinfo=0',
    layout: 'featured',
    featuredLeftCount: 2,
    text: `
      <p>Research, archive and AR iOS application<br>
      The Bartlett School of Architecture, UCL<br>
      Silver medal, Alasdair Turner Dissertation Prize<br>
      London, UK, 2021</p>

      <p>An archival system that combines Deep Learning techniques with XR to process and access geo-based temporal 3D scans. In our age, which is more than ever dynamically archival, the digitalisation of our environment and behaviour becomes the way we teach computers to understand our reality. 3D scanning is an emerging and widely accessible medium that produces a signalised representation of space while incorporating parameters linked to time. This research focuses on 3D scanning as an archival medium, and specifically on the potential of combining different techniques to declutter, organise, and communicate with a spatio-temporal archive. It seeks to define a conceptual framework for development, identify the key components it must include, construct an initial archival system, and finally evaluate the performance of each stage. The methodology is divided into two parts: Back End and Front End. The former concerns the transformation of data into information through 3D semantic segmentation with deep learning, while the latter addresses the transformation of information into knowledge — in terms of communication — through the development of a mobile XR-based system. The case study focuses on a bedroom, though the approach may be applied to other contexts such as museums, construction sites, or even natural environments.</p>
    `,
    links: [
      {
        label: 'Theoretical paper',
        url: 'https://adk.elsevierpure.com/en/publications/an-exploration-of-3d-scanning-as-a-medium-to-record-spatial-memor',
      },
      {
        label: 'Digital exhibition',
        url: 'https://bpro2021.bartlettarchucl.com/architectural-computation/iliana-papadopoulou',
      },
    ],
    images: [
      '/images/archive/app.jpg',
      '/images/archive/components.png',
      '/images/archive/input-sequence.png',
      '/images/archive/data-structure.jpg',
      '/images/archive/user-testing.png',
      '/images/archive/visualisation.jpg',
      '/images/archive/img-01.jpg',
    ],
    videos: [],
  },
  {
    slug: 'geoplant',
    title: 'GeoPlant',
    category: 'research',
    tagline: 'Research & web tool',
    thumbnail: '/images/geoplant/thumb.png',
    imageBg: '/images/geoplant/bg.png',
    layout: 'featured',
    featuredLeftCount: 1,
    text: `
      <p>Henning Larsen, R&D<br>
      Copenhagen with a global target, 2023<br>
      Open-source plant database<br>
      Funded by the Ramboll Foundation & Henning Larsen<br>
      Role: Project manager, UI/UX, Web development</p>

      <p>Optimizing biodiversity-centred design, the new digital tool holds a wealth of global vegetation knowledge and data, providing designers with the means to prioritize native flora in projects. Biodiversity is declining faster than any other period in human history. For years, humans have introduced foreign and invasive species around the world devastating local ecosystems. Native flora are essential in maintaining ecological balance, providing food and habitats to wildlife, and supporting the intricate relationships that maintain ecosystem health and stability.</p>

      <p>Designing spaces that protect and restore indigenous flora is critical to combat the biodiversity crisis. GeoPlant, developed with a team of design experts, biologists, and ecologists, streamlines the design process by digitalizing typically fragmented knowledge. Until recently, digital tools have been absent in landscape design, where books have traditionally dominated the input stream. GeoPlant bridges this gap by converting extensive flora data and knowledge into a digital format, transforming plant selection into a shared, performance-based choice. The tool uses smart technology to understand ecological conditions, enabling users to work more efficiently across different geographies and climate zones. The new tool includes 5,600 plant species gathered from over six sources with 62 features and details attributed to every individual flora. The filters are categorized into general traits, human factors, functionality, productivity, environmental conditions, structure, sensorial aspects, and durability offering a well-rounded holistic perspective. This simplifies the process of selecting plants, allowing users to easily find species based on location, project type, or specific features.</p>

      <p>When constructing GeoPlant, a variety of vegetation data was collected across global offices, to develop a solid foundation to build the tool. Based on the data collection, the team ideated GeoPlant and the database criteria. It was facilitated by an iterative process in which the team selected, re-grouped, defined, and categorized data.</p>

      <p>With GeoPlant, various questions can be explored and answered on the spot such as: Which shrubs are native to Singapore and have yellow flowering? Which plants can remove pollutant such as nitrogen and are natural to the USA? Which trees have a minimum height of 4m and require fertile or silty soil? Which plants are native to Spain, have low watering needs and thrive in full sun condition? Which climber plants have a scent?</p>

      <p>With thanks to the following organizations, Kew Gardens, Cornell University, Botanic Gardens: Conservation International, Finnish Biodiversity Information Facility, USDA's PLANTS database, Uppsala University, and individuals, Randy Mandel, Rajan Santhirasegaran, Nora Menzel, Ana Janzic, Madeline Leong, Agnes Chain, Jostein Rykkelid, Vilma Pylkkö, Jeremy Anterola, Kai Hakala, Juhana Heikkala.</p>
    `,
    links: [
      {
        label: "Henning Larsen's article about GeoPlant",
        url: 'https://henninglarsen.com/projects/geoplant',
      },
    ],
    images: [
      '/images/geoplant/plot.png',
      '/images/geoplant/screenshot-01.png',
      '/images/geoplant/screenshot-02.png',
    ],
    videos: [],
  },
  {
    slug: 'penumbra',
    title: 'Penumbra',
    category: 'data&visuals',
    tagline: 'Visuals',
    thumbnail: '/images/penumbra/thumb.png',
    imageBg: '/images/penumbra/bg.jpg',
    layout: 'featured',
    featuredLeftCount: 1,
    text: `
      <p>Visuals for fashion release and performance<br>
      Yen-Gi, Copenhagen, 2024<br>
      Copenhagen Fashion Week</p>

      <p>Photo/video: @thelocationdrop<br>
      Original sound composition: Tau Contrib<br>
      Event / Art direction: Serena<br>
      Set design / Light design: @pakalidication @jcbkerr @kristinwichstrom<br>
      Light assistance: @happynohope<br>
      Sound curation: @tactual.rec<br>
      Communication: @enzofi<br>
      Graphic Design: @ip.pie<br>
      Audio visual documentation: @beczpeter<br>
      SoMe content creation: @thelocationdrop<br>
      Support photography: @vildelivsdatter<br>
      Fashion: Serena<br>
      Dresser: @brigiss<br>
      Production management: @jcbkerr<br>
      Production assistance: @dariapietruczynik @1stmos @joannaef</p>

      <p>The garden<br>
      Performers: @cosmetablada @ameliaidabang</p>

      <p>The dressing room<br>
      Performers: @yaqubabdirahman @crabfish</p>

      <p>The bedroom<br>
      Performer: @chenert_</p>

      <p>Event support: @thelabcph<br>
      Collection support: @statenskunstfond, @nationalbanken</p>
    `,
    links: [],
    images: [
      '/images/penumbra/img-02.png',
      { src: '/images/penumbra/img-01.png', half: true },
      { src: '/images/penumbra/img-03.png', half: true },
      { src: '/images/penumbra/img-04.png', half: true },
      { src: '/images/penumbra/img-05.png', half: true },
    ],
    videos: [],
  },
  {
    slug: 'shudder',
    title: 'shudder~shutter~shatter',
    category: 'data&visuals',
    tagline: 'Video art',
    thumbnail: '/images/shudder/thumb.png',
    videoBg: 'https://player.vimeo.com/video/924127215?background=1&autoplay=1&loop=1&muted=1',
    layout: 'featured',
    featuredLeftCount: 0,
    text: `
      <p>Contextual Mumbling in collaboration with<br>
      ︎︎︎Coated spirits, at Fade Radio<br>
      Athens 2023<br>
      Roles: Video art</p>

      <p>A "living" sound autobiography of Rainer Werner Fassbinder's life and film-making, co-created with Contextual Mumbling and presented at Fade Radio's 2-Year Anniversary Party ( 8/4; @romantsoathens ).</p>

      <p>*<br>
      // Thundersnow // "Liquid crystals insist on a relationship to life. They seem alive. They may be alive, by some definitions. At the very least, they screen life. Life is screened on them. They come to life as they project scenes of life. They are themselves a form of animation [...]"<br>
      >><br>
      Esther Leslie, "Liquid Crystal," in Liquid Crystals: The Science and Art of a Fluid Form (Reaktion Books, 2016), 205.</p>
    `,
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
    videoBg: 'https://www.youtube.com/embed/ehQHP4elIQ8?autoplay=1&loop=1&mute=1&playlist=ehQHP4elIQ8&controls=0&showinfo=0',
    layout: 'featured',
    featuredLeftCount: 0,
    text: `
      <p>Interactive artwork<br>
      EAXO residency<br>
      Exhibited at Crisis Economy Symposium, Berlin Science week 2025<br>
      Presented at Comfort in Crisis Group show, Brussels, BE, 2025<br>
      Crete, GR, 2025</p>

      <p>were you here is an experimental, interactive artwork that unfolds as an archive of layered spatial and social narratives from the village of Stavros in Crete. Developed during the EAXO artist residency, the project uses video game environments, 3D scanning, and algorithmic text clustering to reveal how histories of conflict, abandonment, and tourism become inscribed in the built environment. Decaying houses, liminal spaces awaiting legal resolution, and sites where nature struggles with artificial design form a landscape marked by both resilience and fragility.</p>

      <p>Through this assemblage, the work exposes the embedded social dynamics between locals, transient visitors, expat communities, and religious institutions, while engaging with questions of how memory and progress are inscribed into sites of everyday life. Rather than producing a definitive archive, the project proposes a fragmentary and non-linear system of memory, one that embraces technological imperfections and partial perspectives. Online texts, local stories, and algorithmically generated clusters of meaning merge with 3D models of transitional spaces, producing a commons that resists closure. In doing so, were you here explores the role of digital media as both a mode of preservation and a form of reinterpretation, highlighting new models of critical making where technology, data, and artistic research intersect.</p>

      <p>The archive reflects nostalgia that may be imagined rather than lived, while at the same time pointing to the Anthropocene transformations specific to this region. The project reflects on how technologies of mapping and recording can operate as tools for resilience in a landscape shaped by property disputes and environmental change. By positioning artistic digital tools as both scientific instruments and poetic mediations, were you here questions what it means to trace, preserve, and inhabit places under slow crisis, and how new commons can emerge from unfinished, collective processes of remembering.</p>
    `,
    links: [],
    images: [
      '/images/were-you-here/img-01.png',
      '/images/were-you-here/img-02.png',
      '/images/were-you-here/img-03.png',
      '/images/were-you-here/img-04.png',
      '/images/were-you-here/img-05.png',
      '/images/were-you-here/img-06.png',
    ],
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
    title: 'Here but when',
    category: 'research',
    tagline: 'The archive across space and time',
    thumbnail: '/images/here-but-when/thumb.gif',
    text: `
      <p><em>The archive across space and time</em><br>London 2020</p>
      <p>The Bartlett School of Architecture, UCL<br>
      Iliana Papadopoulou, Sathish Somasundaram<br>
      Supervisor: Ava Fatah gen Schieck</p>

      <p>An interactive network that layers spatial information from different time periods, allowing users to augment present-day spaces with historical configurations through varied accessibility levels.</p>

      <p>The project questions whether real-time visual representation can serve as a dynamic recording tool for spatial memory. It explores how 3D scanning technology creates digital spatial replicas that can be dynamically updated by users, forming a collectively-built archive accessible through an interactive interface.</p>

      <p>Developed using Unity game engine and Vuforia SDK, featuring an augmented reality mobile application. Includes a "Time Machine" interface element enabling navigation through sequential 3D scans, plus "spots of information" providing localized historical data about discrete objects.</p>
    `,
    videoBg: 'https://player.vimeo.com/video/531762709?background=1&autoplay=1&loop=1&muted=1',
    links: [
      {
        label: 'Media Architecture Biennale',
        url: 'https://demos.mediaarchitecture.org/mab/project/22',
      },
    ],
    images: [],
    videos: [],
  },
];

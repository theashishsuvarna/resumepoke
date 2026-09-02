export type ProjectData = {
  id: string;
  number: string;
  name: string;
  tagline: string;
  ability: string;
  stack: string;
  role: string;
  year: string;
  liveUrl: string;
  githubUrl?: string;
  problem: string;
  idea: string;
  design: string;
  build: string;
  result: string;
  color: string;
  bgColor: string;
};

export const PROJECTS: ProjectData[] = [
  {
    id: 'revanta',
    number: '01',
    name: 'REVANTA AI',
    tagline: 'Business Expansion & Market Redevelopment AI',
    ability: 'MARKET INTELLIGENCE',
    stack: 'AI / DATA / AUTOMATION',
    role: 'Product Designer & AI Builder',
    year: '2024',
    liveUrl: 'https://revantaai.vercel.app/',
    githubUrl: 'https://github.com/theashishsuvarna',
    problem: 'Markets move faster than the tools that track them. Traders and analysts drown in noise — scattered data, delayed signals, and no unified view of what actually matters.',
    idea: 'Build an AI-powered market intelligence platform that distills real-time data into actionable signals — turning raw market chaos into clear, visual territory maps.',
    design: 'A command-center interface with glowing route overlays, territory heatmaps, and animated data particles. Every signal is a route on the map; every insight is a captured territory.',
    build: 'AI pipelines ingest and classify market data in real time. Automated workflows surface anomalies, generate alerts, and visualize trends as interactive map routes.',
    result: 'A living market intelligence dashboard that transforms overwhelming data streams into a single, navigable visual world — making complex market movements feel like a game map you can explore.',
    color: '#ee1515',
    bgColor: '#1a0a0a',
  },
  {
    id: 'nexora',
    number: '02',
    name: 'NEXORA',
    tagline: 'AI-Powered Procurement OS',
    ability: 'PROCUREMENT INTELLIGENCE',
    stack: 'NEXT.JS / TYPESCRIPT / POSTGRESQL',
    role: 'Full-Stack Developer & Designer',
    year: '2024',
    liveUrl: 'https://osnexora.vercel.app/',
    githubUrl: 'https://github.com/theashishsuvarna',
    problem: 'Procurement is a tangled web of suppliers, documents, approvals, and deadlines. Organizations lose money and time tracking what was ordered, what arrived, and what is stuck.',
    idea: 'Create a procurement intelligence platform that visualizes the entire supply chain as a connected network — floating documents, linked nodes, and real-time status flows.',
    design: 'A futuristic warehouse interface with floating document cards, connected supplier nodes, and animated procurement routes. The entire supply chain becomes a living network diagram.',
    build: 'Next.js with TypeScript for type-safe data flows. PostgreSQL stores procurement relationships. Real-time updates keep every node synchronized as orders move through the pipeline.',
    result: 'A procurement network that makes supply chain complexity visible and navigable — every document, supplier, and delivery route connected in one interactive map.',
    color: '#3b82f6',
    bgColor: '#0a1a2a',
  },
  {
    id: 'aikya',
    number: '03',
    name: 'AIKYA',
    tagline: 'Organization Intelligence & Management SaaS',
    ability: 'ORGANIZATION INTELLIGENCE',
    stack: 'NEXT.JS / AI / DATA ANALYTICS',
    role: 'Product Designer & Developer',
    year: '2024',
    liveUrl: 'https://aikyaos.vercel.app/',
    githubUrl: 'https://github.com/theashishsuvarna',
    problem: 'Organizations generate enormous amounts of data but struggle to understand their own structure — who connects to whom, where knowledge lives, and how teams actually function.',
    idea: 'Build an AI-driven organization intelligence tool that maps teams and relationships as a living network of connected nodes — like a Pokédex for an entire organization.',
    design: 'A glowing organization tree where every person and team is a connected character node. AI surfaces hidden connections, knowledge clusters, and collaboration patterns.',
    build: 'Next.js frontend with AI-powered data analytics. The system ingests organizational data, maps relationships, and renders them as an interactive, explorable network graph.',
    result: 'An organization intelligence platform that turns abstract company structure into a tangible, explorable visual world — making hidden connections and knowledge flows visible.',
    color: '#5fba7d',
    bgColor: '#0a1a0a',
  },
  {
    id: 'zerocap',
    number: '04',
    name: 'ZEROCAP',
    tagline: 'Trust-less Delivery Platform for Freelancers',
    ability: 'TRUSTLESS DELIVERY',
    stack: 'WEB / UPI / PAYMENTS',
    role: 'Product Designer & Developer',
    year: '2024',
    liveUrl: 'https://zerocap.vercel.app/',
    githubUrl: 'https://github.com/theashishsuvarna',
    problem: 'Digital transactions need trust. When goods and payments move between strangers, there is no guarantee both sides will deliver — creating friction and risk in every exchange.',
    idea: 'Create a trustless delivery system where payments are locked until delivery is confirmed — a digital package that only opens when both parties are satisfied, like a Poké Ball that releases only on agreement.',
    design: 'A mysterious locked digital package with a Poké Ball-inspired unlocking mechanism. The interface visualizes the escrow state — locked, in-transit, released — with clear, playful status indicators.',
    build: 'Web platform with UPI payment integration. Escrow logic holds funds until delivery confirmation. The system handles the full lifecycle: lock, track, verify, release.',
    result: 'A trustless delivery platform that makes peer-to-peer transactions safe by design — funds locked like a captured Pokémon, released only when both sides confirm the exchange is complete.',
    color: '#ffcb05',
    bgColor: '#1a1a0a',
  },
  {
    id: 'bunkgo',
    number: '05',
    name: 'BUNKGO',
    tagline: 'Hyperlocal Event Discovery Platform',
    ability: 'COMMUNITY DISCOVERY',
    stack: 'NEXT.JS / TYPESCRIPT / TAILWIND',
    role: 'Product Designer & Developer',
    year: '2024',
    liveUrl: 'https://bunkgo.vercel.app/',
    githubUrl: 'https://github.com/theashishsuvarna',
    problem: 'College students live in disconnected bubbles. Finding events, communities, and people nearby is fragmented across scattered group chats, outdated notice boards, and word-of-mouth.',
    idea: 'Build a community discovery platform that turns campus life into a colorful, interactive city map — event markers, tiny character avatars, and real-time discovery of what is happening nearby.',
    design: 'A vibrant animated city map with event markers, tiny character avatars moving between locations, and discovery feeds that feel like exploring a game world for social connections.',
    build: 'Next.js with TypeScript and Tailwind CSS. Location-based event discovery, community feeds, and real-time attendance tracking — all wrapped in a playful, game-like interface.',
    result: 'A community discovery platform that makes campus social life explorable — events, communities, and people mapped onto a living, colorful world that students actually want to use.',
    color: '#ff5a3c',
    bgColor: '#2a1a0a',
  },
];

export type SkillGroup = {
  title: string;
  color: string;
  abilities: string[];
  description: string;
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'DESIGN',
    color: '#ee1515',
    abilities: ['UI / UX', 'PRODUCT DESIGN', 'DESIGN SYSTEMS', 'PROTOTYPING'],
    description: 'Designing interfaces people actually enjoy using. From wireframes to polished design systems — every interaction is intentional.',
  },
  {
    title: 'BUILD',
    color: '#3b82f6',
    abilities: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND'],
    description: 'Full frontend engineering — from component architecture to API integration. The bridge between design and deployment.',
  },
  {
    title: 'AI',
    color: '#5fba7d',
    abilities: ['AI WORKFLOWS', 'DATA ANALYSIS', 'AUTOMATION', 'AI PRODUCT DESIGN'],
    description: 'Integrating AI into real products — not as a buzzword, but as a tool that makes experiences smarter and more useful.',
  },
  {
    title: 'CREATE',
    color: '#ffcb05',
    abilities: ['FIGMA', 'PHOTOSHOP', 'ILLUSTRATOR', 'AFTER EFFECTS', 'PREMIERE PRO'],
    description: 'Visual communication across every medium. From brand identity to motion graphics and video storytelling.',
  },
];

export type BadgeData = {
  id: string;
  title: string;
  color: string;
  description: string;
  details: string;
};

export const BADGES: BadgeData[] = [
  {
    id: 'product',
    title: 'PRODUCT DESIGN',
    color: '#ee1515',
    description: 'Badge earned through building end-to-end product experiences.',
    details: 'Designed and shipped 5 full product experiences across fintech, procurement, organization intelligence, payments, and community platforms. From problem discovery to final pixel — owning the entire product design lifecycle.',
  },
  {
    id: 'uiux',
    title: 'UI / UX',
    color: '#3b82f6',
    description: 'Crafting interfaces people actually enjoy using.',
    details: 'Built design systems, interactive prototypes, and user flows that balance aesthetics with usability. Every interaction is intentional — from micro-interactions to information architecture.',
  },
  {
    id: 'webdev',
    title: 'WEB DEVELOPMENT',
    color: '#5fba7d',
    description: 'Turning designs into real, working products.',
    details: 'React, Next.js, TypeScript, Tailwind CSS. Full frontend engineering — from component architecture to API integration. The bridge between design and deployment.',
  },
  {
    id: 'ai',
    title: 'AI',
    color: '#ffcb05',
    description: 'Building with AI workflows and automation.',
    details: 'AI product design, data analysis, and automation workflows. Integrating AI into real products — not as a buzzword, but as a tool that makes experiences smarter and more useful.',
  },
  {
    id: 'graphic',
    title: 'GRAPHIC DESIGN',
    color: '#ff5a3c',
    description: 'Visual communication across every medium.',
    details: 'Figma, Photoshop, Illustrator. From brand identity to marketing assets — creating visual systems that are consistent, expressive, and memorable.',
  },
  {
    id: 'video',
    title: 'VIDEO EDITING',
    color: '#9333ea',
    description: 'Motion and story through video.',
    details: 'After Effects and Premiere Pro. Bringing static designs to life through motion graphics, animation, and video storytelling.',
  },
];

export type CertData = {
  title: string;
  issuer: string;
};

export const CERTS: CertData[] = [
  { title: 'Software Engineer', issuer: 'HackerRank' },
  { title: 'Frontend Developer — React', issuer: 'HackerRank' },
  { title: 'SQL Advanced', issuer: 'HackerRank' },
  { title: 'Product Management', issuer: 'GeeksforGeeks' },
  { title: 'Foundations of Cybersecurity', issuer: 'Google / Coursera' },
  { title: 'Generative AI & ChatGPT', issuer: 'Certified' },
  { title: 'Machine Learning & Data Science', issuer: 'Certified' },
];

export const TRAINER = {
  name: 'ASHISH SUVARNA',
  role: 'Product Designer × Builder × Creative Technologist',
  class: 'PRODUCT DESIGNER / BUILDER',
  region: 'NAVI MUMBAI',
  speciality: 'DESIGN × CODE × AI',
  bio: 'Ashish combines UX design, modern frontend engineering and AI workflows to build scalable digital products across fintech, creator economy and community platforms. He lives where design systems meet shipping code — turning complex problems into interfaces people actually enjoy using.',
  stats: [
    { val: '5', label: 'PROJECTS SHIPPED' },
    { val: '7+', label: 'CERTIFICATIONS' },
    { val: '∞', label: 'IDEAS BREWING' },
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/ashishhsuvarna',
    github: 'https://github.com/theashishsuvarna',
    email: 'mailto:ashishsuvarna@example.com',
    resume: 'https://drive.google.com/file/d/1LQcWFsFWnc_CWPGgFd7gKtz7oFxFswsA/view',
  },
};

export type RegionId =
  | 'village'
  | 'forest'
  | 'river'
  | 'coastal'
  | 'tech'
  | 'gym'
  | 'mountain'
  | 'ice'
  | 'summit';

export type RegionData = {
  id: RegionId;
  name: string;
  subtitle: string;
  position: [number, number, number];
  color: string;
};

export const REGIONS: RegionData[] = [
  { id: 'village', name: 'STARTER VILLAGE', subtitle: 'Where the journey begins', position: [0, 0, 0], color: '#5fba7d' },
  { id: 'forest', name: 'FOREST ROUTE', subtitle: 'Abilities & skills hidden in the wild', position: [0, 0, -40], color: '#3b9e5f' },
  { id: 'river', name: 'RIVER VALLEY', subtitle: 'Flowing creativity', position: [35, 0, -30], color: '#3b82f6' },
  { id: 'coastal', name: 'COASTAL CITY', subtitle: 'Where projects live', position: [40, 0, 15], color: '#ff5a3c' },
  { id: 'tech', name: 'TECH CITY', subtitle: 'Skills & technology hub', position: [10, 0, 35], color: '#3b82f6' },
  { id: 'gym', name: 'GYM DISTRICT', subtitle: 'Badges earned', position: [-30, 0, 25], color: '#ee1515' },
  { id: 'mountain', name: 'MOUNTAIN REGION', subtitle: 'The climb', position: [-35, 0, -15], color: '#8b6f47' },
  { id: 'ice', name: 'ICE REGION', subtitle: 'A frozen milestone', position: [-20, 0, -40], color: '#7dd3fc' },
  { id: 'summit', name: 'FINAL SUMMIT', subtitle: 'Trainer profile revealed', position: [0, 20, -60], color: '#ffcb05' },
];

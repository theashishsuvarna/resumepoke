export type Project = {
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

export const PROJECTS: Project[] = [
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

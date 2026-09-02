import { motion } from 'framer-motion';
import { CharizardChar, GreninjaChar, GardevoirChar, SnorlaxChar, JigglypuffChar } from './PokemonChars';

/* REVANTA AI — Futuristic map with glowing routes and data particles + Charizard */
export function RevantaArt() {
  return (
    <div className="relative w-full h-full bg-[#1a0a0a] overflow-hidden">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="300" stroke="#ee1515" strokeWidth="0.5" opacity="0.15" />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="400" y2={i * 50} stroke="#ee1515" strokeWidth="0.5" opacity="0.15" />
        ))}
        <motion.circle cx="100" cy="120" r="40" fill="#ee1515" opacity="0.15" stroke="#ee1515" strokeWidth="1.5"
          animate={{ r: [38, 44, 38] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="280" cy="180" r="35" fill="#ffcb05" opacity="0.15" stroke="#ffcb05" strokeWidth="1.5"
          animate={{ r: [33, 39, 33] }} transition={{ duration: 4, repeat: Infinity }} />
        <motion.circle cx="200" cy="80" r="25" fill="#3b82f6" opacity="0.15" stroke="#3b82f6" strokeWidth="1.5"
          animate={{ r: [23, 29, 23] }} transition={{ duration: 3.5, repeat: Infinity }} />
        <motion.path d="M100 120 Q150 60 200 80 Q240 130 280 180" fill="none" stroke="#ee1515" strokeWidth="2" strokeDasharray="4 4"
          animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
        <motion.path d="M200 80 L280 180" fill="none" stroke="#ffcb05" strokeWidth="1.5" strokeDasharray="3 5"
          animate={{ strokeDashoffset: [0, -16] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} />
        <circle cx="100" cy="120" r="5" fill="#ee1515" />
        <circle cx="280" cy="180" r="5" fill="#ffcb05" />
        <circle cx="200" cy="80" r="5" fill="#3b82f6" />
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.circle key={i} r="2" fill="#ee1515"
            animate={{ cx: [100, 200, 280], cy: [120, 80, 180], opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }} />
        ))}
        <text x="100" y="175" fill="#ee1515" fontSize="8" fontFamily="monospace" fontWeight="bold">SECTOR A</text>
        <text x="280" y="235" fill="#ffcb05" fontSize="8" fontFamily="monospace" fontWeight="bold">SECTOR B</text>
        <text x="200" y="65" fill="#3b82f6" fontSize="8" fontFamily="monospace" fontWeight="bold">SECTOR C</text>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <CharizardChar className="w-2/3 max-w-[200px]" />
      </div>
    </div>
  );
}

/* NEXORA — Futuristic warehouse with floating documents + Greninja */
export function NexoraArt() {
  return (
    <div className="relative w-full h-full bg-[#0a1a2a] overflow-hidden">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        <path d="M50 250 L50 120 L200 60 L350 120 L350 250 Z" fill="none" stroke="#3b82f6" strokeWidth="2" opacity="0.4" />
        <line x1="200" y1="60" x2="200" y2="250" stroke="#3b82f6" strokeWidth="1" opacity="0.3" />
        {[{x:80,y:150},{x:200,y:100},{x:320,y:150},{x:140,y:200},{x:260,y:200}].map((n, i) => (
          <g key={i}>
            <motion.circle cx={n.x} cy={n.y} r="8" fill="#3b82f6" opacity="0.3" stroke="#3b82f6" strokeWidth="1.5"
              animate={{ r: [7, 10, 7] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
            <circle cx={n.x} cy={n.y} r="4" fill="#3b82f6" />
          </g>
        ))}
        <line x1="80" y1="150" x2="200" y2="100" stroke="#3b82f6" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
        <line x1="200" y1="100" x2="320" y2="150" stroke="#3b82f6" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
        <line x1="80" y1="150" x2="140" y2="200" stroke="#3b82f6" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
        <line x1="320" y1="150" x2="260" y2="200" stroke="#3b82f6" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
        <line x1="140" y1="200" x2="260" y2="200" stroke="#3b82f6" strokeWidth="1" opacity="0.4" strokeDasharray="3 3" />
        {[
          {x:100,y:80,r:-10},{x:250,y:70,r:15},{x:180,y:160,r:-5},{x:300,y:120,r:10}
        ].map((d, i) => (
          <motion.g key={i}
            animate={{ y: [0, -8, 0], rotate: [d.r, d.r + 5, d.r] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}>
            <rect x={d.x} y={d.y} width="30" height="38" rx="2" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="1.5" transform={`rotate(${d.r} ${d.x + 15} ${d.y + 19})`} />
            <line x1={d.x + 5} y1={d.y + 8} x2={d.x + 25} y2={d.y + 8} stroke="#3b82f6" strokeWidth="1" transform={`rotate(${d.r} ${d.x + 15} ${d.y + 19})`} />
            <line x1={d.x + 5} y1={d.y + 14} x2={d.x + 22} y2={d.y + 14} stroke="#3b82f6" strokeWidth="1" transform={`rotate(${d.r} ${d.x + 15} ${d.y + 19})`} />
            <line x1={d.x + 5} y1={d.y + 20} x2={d.x + 25} y2={d.y + 20} stroke="#3b82f6" strokeWidth="1" transform={`rotate(${d.r} ${d.x + 15} ${d.y + 19})`} />
          </motion.g>
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <GreninjaChar className="w-2/3 max-w-[200px]" />
      </div>
    </div>
  );
}

/* AIKYA — Organization tree as glowing connected nodes + Gardevoir */
export function AikyaArt() {
  const nodes = [
    {x:200,y:40,c:'#5fba7d'},{x:120,y:110,c:'#3b82f6'},{x:280,y:110,c:'#ffcb05'},
    {x:80,y:190,c:'#ee1515'},{x:160,y:190,c:'#5fba7d'},{x:240,y:190,c:'#3b82f6'},{x:320,y:190,c:'#ffcb05'},
    {x:50,y:260,c:'#ffcb05'},{x:110,y:260,c:'#ee1515'},{x:200,y:260,c:'#5fba7d'},{x:290,y:260,c:'#3b82f6'},{x:350,y:260,c:'#ee1515'},
  ];
  const links = [[0,1],[0,2],[1,3],[1,4],[2,5],[2,6],[3,7],[3,8],[4,9],[5,10],[6,11]];
  return (
    <div className="relative w-full h-full bg-[#0a1a0a] overflow-hidden">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        {links.map(([a, b], i) => (
          <motion.line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke={nodes[a].c} strokeWidth="1" opacity="0.3" strokeDasharray="2 4"
            animate={{ strokeDashoffset: [0, -12] }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            <motion.circle cx={n.x} cy={n.y} r="10" fill={n.c} opacity="0.2" stroke={n.c} strokeWidth="1.5"
              animate={{ r: [9, 13, 9], opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.2 }} />
            <circle cx={n.x} cy={n.y} r="5" fill={n.c} />
            <circle cx={n.x} cy={n.y} r="2" fill="#fdf9ee" />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <GardevoirChar className="w-2/3 max-w-[200px]" />
      </div>
    </div>
  );
}

/* ZEROCAP — Mysterious locked digital package + Snorlax */
export function ZerocapArt() {
  return (
    <div className="relative w-full h-full bg-[#1a1a0a] overflow-hidden">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        <motion.circle cx="200" cy="150" r="80" fill="#ffcb05" opacity="0.05"
          animate={{ r: [75, 90, 75], opacity: [0.03, 0.1, 0.03] }}
          transition={{ duration: 3, repeat: Infinity }} />
        <rect x="140" y="100" width="120" height="100" rx="8" fill="#2a2a1a" stroke="#ffcb05" strokeWidth="2" />
        <line x1="140" y1="130" x2="260" y2="130" stroke="#ffcb05" strokeWidth="2" />
        <motion.g
          animate={{ rotate: [0, 5, 0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ transformOrigin: '200px 150px' }}
        >
          <circle cx="200" cy="150" r="28" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="4" />
          <path d="M172 150 A28 28 0 0 1 228 150 Z" fill="#ee1515" stroke="#0a0a0a" strokeWidth="4" />
          <rect x="172" y="147" width="56" height="6" fill="#0a0a0a" />
          <circle cx="200" cy="150" r="9" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="4" />
          <circle cx="200" cy="150" r="4" fill="#ffcb05" />
        </motion.g>
        <motion.circle cx="160" cy="115" r="3" fill="#ee1515"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <text x="170" y="118" fill="#ee1515" fontSize="7" fontFamily="monospace" fontWeight="bold">LOCKED</text>
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.circle key={i} cx={200} cy={150} r="2" fill="#ffcb05"
            animate={{ cx: [200, 200 + (i - 2) * 30], cy: [150, 220], opacity: [1, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
        ))}
        <path d="M40 40 L70 40 L70 50 L50 50 L50 70 L40 70 Z" fill="none" stroke="#ffcb05" strokeWidth="1.5" opacity="0.4" />
        <path d="M360 260 L330 260 L330 250 L350 250 L350 230 L360 230 Z" fill="none" stroke="#ffcb05" strokeWidth="1.5" opacity="0.4" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <SnorlaxChar className="w-2/3 max-w-[200px]" />
      </div>
    </div>
  );
}

/* BUNKGO — Colorful animated city map + Jigglypuff */
export function BunkgoArt() {
  return (
    <div className="relative w-full h-full bg-[#2a1a0a] overflow-hidden">
      <svg viewBox="0 0 400 300" className="absolute inset-0 w-full h-full">
        <line x1="0" y1="100" x2="400" y2="100" stroke="#fdf9ee" strokeWidth="6" opacity="0.3" />
        <line x1="0" y1="200" x2="400" y2="200" stroke="#fdf9ee" strokeWidth="6" opacity="0.3" />
        <line x1="130" y1="0" x2="130" y2="300" stroke="#fdf9ee" strokeWidth="6" opacity="0.3" />
        <line x1="270" y1="0" x2="270" y2="300" stroke="#fdf9ee" strokeWidth="6" opacity="0.3" />
        <rect x="20" y="120" width="40" height="60" fill="#ff5a3c" stroke="#0a0a0a" strokeWidth="2" rx="3" />
        <rect x="70" y="130" width="30" height="50" fill="#ffcb05" stroke="#0a0a0a" strokeWidth="2" rx="3" />
        <rect x="150" y="120" width="50" height="60" fill="#5fba7d" stroke="#0a0a0a" strokeWidth="2" rx="3" />
        <rect x="210" y="130" width="35" height="50" fill="#3b82f6" stroke="#0a0a0a" strokeWidth="2" rx="3" />
        <rect x="290" y="120" width="45" height="60" fill="#ee1515" stroke="#0a0a0a" strokeWidth="2" rx="3" />
        <rect x="345" y="130" width="35" height="50" fill="#ffcb05" stroke="#0a0a0a" strokeWidth="2" rx="3" />
        {[
          {x:65,y:80,c:'#ee1515'},{x:250,y:80,c:'#ffcb05'},{x:180,y:230,c:'#5fba7d'},{x:330,y:230,c:'#3b82f6'}
        ].map((m, i) => (
          <motion.g key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}>
            <path d={`M${m.x} ${m.y} L${m.x - 8} ${m.y - 16} L${m.x + 8} ${m.y - 16} Z`} fill={m.c} stroke="#0a0a0a" strokeWidth="1.5" />
            <circle cx={m.x} cy={m.y - 20} r="6" fill={m.c} stroke="#0a0a0a" strokeWidth="2" />
          </motion.g>
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.text key={i} x={20 + i * 65} y="30" fill="#ffcb05" fontSize="10"
            animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>✦</motion.text>
        ))}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <JigglypuffChar className="w-1/2 max-w-[160px]" />
      </div>
    </div>
  );
}

export const PROJECT_ARTS: Record<string, () => JSX.Element> = {
  revanta: RevantaArt,
  nexora: NexoraArt,
  aikya: AikyaArt,
  zerocap: ZerocapArt,
  bunkgo: BunkgoArt,
};

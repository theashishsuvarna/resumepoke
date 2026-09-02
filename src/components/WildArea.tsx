import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Sparkles, Zap, Orbit, MousePointerClick, Shuffle } from 'lucide-react';

export default function WildArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    };
    const el = containerRef.current;
    el?.addEventListener('mousemove', onMove);
    return () => el?.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="wild" ref={containerRef} className="relative py-20 sm:py-28 px-5 sm:px-8 bg-gradient-to-b from-cream-200 via-cream-100 to-cream-200 overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              backgroundColor: i % 3 === 0 ? '#ee1515' : i % 3 === 1 ? '#ffcb05' : '#5fba7d',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 ? 15 : -15), 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold tracking-widest text-poke-red bg-cream-100 border-2 border-ink-900 px-3 py-1 rounded-full">SECTION 07</span>
            <span className="font-mono text-xs font-bold tracking-widest text-ink-700">THE WILD AREA</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[0.95] sm:leading-[0.88]">
            THE <span className="text-poke-red">WILD</span>
            <br />
            AREA
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink-700 max-w-md">
            Where experiments roam free. Generative visuals, AI experiments, motion play, and creative coding. Move your mouse — things react.
          </p>
        </motion.div>

        {/* Experiment tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Generative orb */}
          <ExperimentTile title="GENERATIVE ORB" icon={Orbit} color="#ee1515">
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-poke-red"
                  style={{ width: 60 + i * 20, height: 60 + i * 20 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10 + i * 2, repeat: Infinity, ease: 'linear' }}
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-poke-red animate-breathe" />
            </motion.div>
          </ExperimentTile>

          {/* AI particles */}
          <ExperimentTile title="AI PARTICLES" icon={Sparkles} color="#5fba7d">
            <div className="relative w-full h-full">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-poke-green"
                  style={{ left: `${50 + Math.cos(i / 12 * Math.PI * 2) * 35}%`, top: `${50 + Math.sin(i / 12 * Math.PI * 2) * 35}%` }}
                  animate={{
                    left: [`${50 + Math.cos(i / 12 * Math.PI * 2) * 35}%`, `${50 + Math.cos((i + 6) / 12 * Math.PI * 2) * 35}%`, `${50 + Math.cos(i / 12 * Math.PI * 2) * 35}%`],
                    top: [`${50 + Math.sin(i / 12 * Math.PI * 2) * 35}%`, `${50 + Math.sin((i + 6) / 12 * Math.PI * 2) * 35}%`, `${50 + Math.sin(i / 12 * Math.PI * 2) * 35}%`],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: i * 0.1 }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-poke-green/40 blur-sm" />
              </div>
            </div>
          </ExperimentTile>

          {/* Electric pulse */}
          <ExperimentTile title="ELECTRIC PULSE" icon={Zap} color="#ffcb05">
            <div className="relative w-full h-full flex items-center justify-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border-2 border-poke-yellow"
                  style={{ width: 40, height: 40 }}
                  animate={{ scale: [1, 4], opacity: [0.8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />
              ))}
              <Zap className="w-8 h-8 text-poke-yellow fill-poke-yellow" />
            </div>
          </ExperimentTile>

          {/* Mouse follower */}
          <ExperimentTile title="CURSOR ECHO" icon={MousePointerClick} color="#3b82f6">
            <div className="relative w-full h-full">
              <motion.div
                className="absolute w-12 h-12 rounded-full bg-poke-blue/30 border-2 border-poke-blue"
                style={{
                  left: `${mousePos.x * 100}%`,
                  top: `${mousePos.y * 100}%`,
                  x: '-50%',
                  y: '-50%',
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-ink-500">
                MOVE MOUSE HERE
              </div>
            </div>
          </ExperimentTile>

          {/* Random shuffle */}
          <ExperimentTile title="RANDOM ENCOUNTER" icon={Shuffle} color="#ff5a3c" interactive>
            <RandomEncounter />
          </ExperimentTile>

          {/* Halftone wave */}
          <ExperimentTile title="HALFTONE WAVE" icon={Orbit} color="#9333ea">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {Array.from({ length: 5 }).map((_, row) => (
                <div key={row} className="flex gap-2">
                  {Array.from({ length: 10 }).map((_, col) => (
                    <motion.div
                      key={col}
                      className="rounded-full bg-ink-900"
                      style={{ width: 6, height: 6 }}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: (row + col) * 0.08 }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </ExperimentTile>
        </div>
      </div>
    </section>
  );
}

function ExperimentTile({
  title,
  icon: Icon,
  color,
  children,
  interactive,
}: {
  title: string;
  icon: typeof Orbit;
  color: string;
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      data-cursor="hover"
      className="group relative aspect-square bg-cream-100 border-4 border-ink-900 rounded-2xl ink-border overflow-hidden"
    >
      {/* Content */}
      <div className="absolute inset-0 p-4">{children}</div>

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-ink-900/70 to-transparent flex items-center gap-2">
        <Icon className="w-4 h-4" style={{ color }} strokeWidth={2.5} />
        <span className="font-mono text-[10px] font-bold tracking-widest text-cream-100">{title}</span>
        {interactive && <span className="ml-auto font-mono text-[9px] text-poke-yellow">CLICK ME</span>}
      </div>
    </motion.div>
  );
}

function RandomEncounter() {
  const chars = ['!', '?', '✦', '★', '⚡', '◆'];
  const [char, setChar] = useState('!');

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.button
        onClick={() => setChar(chars[Math.floor(Math.random() * chars.length)])}
        data-cursor="hover"
        animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 0.4 }}
        key={char}
        className="font-display font-extrabold text-6xl"
        style={{ color: '#ff5a3c' }}
      >
        {char}
      </motion.button>
      <div className="absolute bottom-12 left-0 right-0 text-center font-mono text-[9px] text-ink-500">
        TAP TO ENCOUNTER
      </div>
    </div>
  );
}

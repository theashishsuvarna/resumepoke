import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { PikachuChar, FlyingSilhouette } from './PokemonChars';

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yMountains = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yHills = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yGrass = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yClouds = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 20 });
  const py = useSpring(my, { stiffness: 50, damping: 20 });

  const [charPos, setCharPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = (e.clientX / window.innerWidth - 0.5) * 2;
      const cy = (e.clientY / window.innerHeight - 0.5) * 2;
      mx.set(cx * 20);
      my.set(cy * 10);
      setCharPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-cream-200">
      {/* Sun glow */}
      <motion.div
        style={{ x: px, y: py }}
        className="absolute top-[8%] right-[12%] w-48 h-48 rounded-full bg-poke-yellow/40 blur-3xl"
      />
      <div className="absolute top-[10%] right-[15%] w-28 h-28 rounded-full bg-poke-yellow/70 blur-md" />

      {/* Clouds layer */}
      <motion.div style={{ y: yClouds, x: px }} className="absolute inset-0 z-10">
        <Cloud className="absolute top-[12%] left-[5%] w-32" delay={0} />
        <Cloud className="absolute top-[22%] left-[55%] w-44" delay={1.5} />
        <Cloud className="absolute top-[8%] left-[75%] w-28" delay={0.8} />
        <Cloud className="absolute top-[30%] left-[20%] w-36" delay={2} />
      </motion.div>

      {/* Flying silhouettes */}
      <motion.div style={{ x: px, y: yClouds }} className="absolute inset-0 z-10">
        <FlyingSilhouette className="absolute top-[18%] left-[30%] w-12" />
        <FlyingSilhouette className="absolute top-[25%] left-[65%] w-10" />
      </motion.div>

      {/* Mountains */}
      <motion.svg
        style={{ y: yMountains, x: px }}
        viewBox="0 0 1440 400"
        className="absolute bottom-[35%] left-0 w-full z-20"
        preserveAspectRatio="none"
      >
        <path d="M0 400 L0 200 L200 80 L380 220 L560 100 L760 240 L960 120 L1180 200 L1440 100 L1440 400 Z" fill="#6b7a8a" stroke="#0a0a0a" strokeWidth="3" />
        <path d="M180 100 L200 80 L220 100 L210 120 Z" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="2" />
        <path d="M540 120 L560 100 L580 120 L570 140 Z" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="2" />
        <path d="M940 140 L960 120 L980 140 L970 160 Z" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="2" />
      </motion.svg>

      {/* Hills */}
      <motion.svg
        style={{ y: yHills, x: px }}
        viewBox="0 0 1440 300"
        className="absolute bottom-[22%] left-0 w-full z-20"
        preserveAspectRatio="none"
      >
        <path d="M0 300 L0 150 Q360 60 720 150 Q1080 240 1440 120 L1440 300 Z" fill="#5fba7d" stroke="#0a0a0a" strokeWidth="3" />
      </motion.svg>

      {/* Trees */}
      <motion.div style={{ y: yHills, x: px }} className="absolute bottom-[24%] left-0 w-full z-20">
        <Tree className="absolute bottom-0 left-[8%] w-20" />
        <Tree className="absolute bottom-0 left-[28%] w-16" />
        <Tree className="absolute bottom-0 left-[82%] w-24" />
        <Tree className="absolute bottom-0 left-[92%] w-16" />
      </motion.div>

      {/* Grass / ground */}
      <motion.div style={{ y: yGrass }} className="absolute bottom-0 left-0 right-0 z-30">
        <svg viewBox="0 0 1440 200" className="w-full" preserveAspectRatio="none">
          <path d="M0 200 L0 60 Q720 20 1440 60 L1440 200 Z" fill="#4a9e5f" stroke="#0a0a0a" strokeWidth="3" />
        </svg>
        {/* Grass tufts */}
        <div className="absolute top-0 left-0 w-full flex justify-between px-8 -translate-y-3">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: 'easeInOut' }}
              className="text-ink-900"
            >
              <svg width="14" height="20" viewBox="0 0 14 20">
                <path d="M7 20 Q4 10 7 0 Q10 10 7 20" fill="#4a9e5f" stroke="#0a0a0a" strokeWidth="1.5" />
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity, scale }} className="absolute inset-0 z-40 flex flex-col items-center justify-center px-5 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-[10px] sm:text-xs font-bold tracking-[0.25em] text-ink-700 mb-3 bg-cream-100/60 px-3 py-1.5 rounded-full border-2 border-ink-900"
        >
          ASHISH SUVARNA
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="font-display font-extrabold tracking-tight text-ink-900 leading-[0.95] sm:leading-[0.88] md:leading-[0.85] text-[clamp(2.5rem,10vw,8rem)]"
          style={{ wordSpacing: '0.05em' }}
        >
          I BUILD
          <br />
          <span className="text-poke-red">DIGITAL</span>
          <br />
          WORLDS.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4 flex flex-wrap justify-center gap-1.5 sm:gap-2 max-w-md"
        >
          {['PRODUCT DESIGNER', 'UI/UX DESIGNER', 'WEB DEVELOPER', 'AI BUILDER'].map((role, i) => (
            <span key={role} className={`font-mono text-[10px] sm:text-xs font-bold tracking-widest px-3 py-1 border-2 border-ink-900 ${i % 2 === 0 ? 'bg-cream-100' : 'bg-ink-900 text-cream-100'}`}>
              {role}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-4 max-w-md text-xs sm:text-sm md:text-base text-ink-700"
        >
          Designing thoughtful digital products where design, technology and AI meet.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="mt-6 flex flex-col sm:flex-row gap-3 items-center sm:gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor="hover"
            className="group relative overflow-hidden bg-poke-red text-cream-100 font-display font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-ink-900 ink-border rounded-xl w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2 justify-center">START EXPLORING</span>
            <motion.span className="absolute inset-0 bg-ink-900" initial={{ y: '100%' }} whileHover={{ y: 0 }} transition={{ duration: 0.3 }} />
            <span className="absolute inset-0 flex items-center justify-center text-cream-100 font-display font-bold text-sm sm:text-base z-10 group-hover:opacity-100 opacity-0 transition-opacity duration-300">START EXPLORING</span>
          </button>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            data-cursor="hover"
            className="bg-cream-100 text-ink-900 font-display font-bold text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-ink-900 ink-border rounded-xl hover:bg-poke-yellow transition-colors w-full sm:w-auto"
          >
            VIEW MY WORK
          </button>
        </motion.div>
      </motion.div>

      {/* Pikachu character */}
      <motion.div
        style={{ x: px, y: py }}
        className="absolute bottom-[28%] right-[3%] sm:right-[6%] z-30 w-24 sm:w-40 md:w-48 max-w-[35vw]"
      >
        <PikachuChar className="w-full drop-shadow-[4px_4px_0_rgba(10,10,10,0.2)]" follow={charPos} />
      </motion.div>

      {/* Particles */}
      <div className="absolute inset-0 z-30 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-poke-yellow"
            style={{ left: `${(i * 7) % 100}%`, top: `${(i * 13) % 80}%` }}
            animate={{ y: [0, -20, 0], opacity: [0, 1, 0] }}
            transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[10px] font-bold tracking-widest text-ink-700">SCROLL TO EXPLORE</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-ink-900 flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-poke-red" animate={{ y: [0, 12, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Cloud({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ x: [0, 30, 0] }}
      transition={{ duration: 8, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 100 50" className="w-full">
        <ellipse cx="30" cy="30" rx="25" ry="18" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="2.5" />
        <ellipse cx="55" cy="25" rx="28" ry="20" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="2.5" />
        <ellipse cx="75" cy="32" rx="20" ry="15" fill="#fdf9ee" stroke="#0a0a0a" strokeWidth="2.5" />
      </svg>
    </motion.div>
  );
}

function Tree({ className }: { className?: string }) {
  return (
    <motion.div className={className} animate={{ rotate: [-2, 2, -2] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
      <svg viewBox="0 0 60 100" className="w-full">
        <rect x="26" y="55" width="8" height="40" fill="#8b6f47" stroke="#0a0a0a" strokeWidth="2.5" />
        <circle cx="30" cy="35" r="28" fill="#4a9e5f" stroke="#0a0a0a" strokeWidth="2.5" />
        <circle cx="18" cy="42" r="14" fill="#5fba7d" stroke="#0a0a0a" strokeWidth="2.5" />
        <circle cx="42" cy="42" r="14" fill="#5fba7d" stroke="#0a0a0a" strokeWidth="2.5" />
      </svg>
    </motion.div>
  );
}

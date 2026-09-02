import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import { PokeBall } from './PokeBall';

const NAV_ITEMS = [
  { label: 'WORK', target: 'projects' },
  { label: 'ABOUT', target: 'trainer' },
  { label: 'SKILLS', target: 'skills' },
  { label: 'EXPERIMENTS', target: 'wild' },
  { label: 'CONTACT', target: 'final' },
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    setScrolled(v > 80);
  });

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4"
      >
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? 'bg-cream-100/85 backdrop-blur-md border-2 border-ink-900 rounded-2xl px-5 py-3 ink-border'
              : 'bg-transparent border-2 border-transparent px-1 py-1'
          }`}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            data-cursor="hover"
            className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="w-6 h-6 sm:w-7 sm:h-7 shrink-0"
            >
              <PokeBall className="w-full h-full" size={28} />
            </motion.div>
            <span className="font-display font-extrabold text-base sm:text-lg tracking-tight">ASHISH</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.target)}
                data-cursor="hover"
                className="relative font-mono text-xs font-bold tracking-widest px-4 py-2 group"
              >
                <span className="relative z-10 transition-colors group-hover:text-poke-red">{item.label}</span>
                <motion.span
                  className="absolute inset-0 bg-poke-red/10 rounded-lg"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                />
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            data-cursor="hover"
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2 shrink-0"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              className="block w-6 h-0.5 bg-ink-900"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-6 h-0.5 bg-ink-900"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              className="block w-6 h-0.5 bg-ink-900"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? 'auto' : 'none' }}
        className="fixed inset-0 z-40 md:hidden flex items-center justify-center bg-cream-100/95 backdrop-blur-lg px-6"
      >
        <nav className="flex flex-col gap-5 sm:gap-6 w-full max-w-xs">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.label}
              onClick={() => scrollTo(item.target)}
              animate={{ y: menuOpen ? 0 : 30, opacity: menuOpen ? 1 : 0 }}
              transition={{ delay: menuOpen ? i * 0.06 : 0 }}
              className="font-display font-extrabold text-3xl sm:text-4xl text-left w-full"
            >
              {item.label}
            </motion.button>
          ))}
        </nav>
      </motion.div>
    </>
  );
}

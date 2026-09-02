import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PikachuChar, EeveeChar, CharmanderChar } from './PokemonChars';

type Starter = {
  id: string;
  name: string;
  trait: string;
  color: string;
  bgGradient: string;
  description: string;
  skills: string[];
  Char: typeof PikachuChar;
};

const STARTERS: Starter[] = [
  {
    id: 'pikachu',
    name: 'PIKACHU',
    trait: 'DESIGN',
    color: '#ffcb05',
    bgGradient: 'from-poke-yellow/30 to-cream-200',
    description: 'The spark of every great product. Pikachu represents my design instinct — turning raw ideas into interfaces that feel electric and alive. From wireframes to polished design systems, this is where the journey starts.',
    skills: ['UI / UX DESIGN', 'PRODUCT DESIGN', 'DESIGN SYSTEMS', 'PROTOTYPING'],
    Char: PikachuChar,
  },
  {
    id: 'eevee',
    name: 'EEVEE',
    trait: 'ADAPTABILITY',
    color: '#c89060',
    bgGradient: 'from-amber-200/40 to-cream-200',
    description: 'Eevee evolves to fit any challenge. This is my adaptability — moving fluidly between design, code, and AI. Whether it is a fintech dashboard, a community app, or an AI workflow, I adapt my approach to what the problem demands.',
    skills: ['CROSS-DISCIPLINE', 'RAPID PROTOTYPING', 'PROBLEM SOLVING', 'LEARNING FAST'],
    Char: EeveeChar,
  },
  {
    id: 'charmander',
    name: 'CHARMANDER',
    trait: 'BUILD / CODE',
    color: '#ff8c42',
    bgGradient: 'from-orange-200/40 to-cream-200',
    description: 'Charmander builds fire from nothing. This is my engineering side — taking designs and turning them into real, working products. React, Next.js, TypeScript, Tailwind. The flame that ships.',
    skills: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND CSS'],
    Char: CharmanderChar,
  },
];

export default function ChooseStarter() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<Starter | null>(null);
  const active = STARTERS.find((s) => s.id === hovered) || selected;

  return (
    <section className="relative py-20 sm:py-28 px-5 sm:px-8 overflow-hidden transition-colors duration-700"
      style={{ background: active ? `linear-gradient(to bottom, ${active.color}15, #fdf9ee)` : '#fdf9ee' }}
    >
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="font-mono text-xs font-bold tracking-widest text-poke-red bg-cream-100 border-2 border-ink-900 px-3 py-1 rounded-full">SECTION 03</span>
          <h2 className="mt-4 font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[0.95] sm:leading-[0.9]">
            CHOOSE YOUR
            <br />
            <span className="text-poke-red">STARTER</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink-700 max-w-md mx-auto">
            Three sides of Ashish. Hover to explore. Click to reveal.
          </p>
        </motion.div>

        {/* Characters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {STARTERS.map((starter, i) => {
            const Char = starter.Char;
            const isActive = hovered === starter.id || selected?.id === starter.id;
            return (
              <motion.div
                key={starter.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                onMouseEnter={() => setHovered(starter.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setSelected(selected?.id === starter.id ? null : starter)}
                data-cursor="hover"
                className="group relative cursor-pointer"
              >
                <motion.div
                  animate={isActive ? { scale: 1.05, y: -8 } : { scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative aspect-square bg-cream-100 border-4 border-ink-900 rounded-3xl overflow-hidden ink-border"
                >
                  {/* Background */}
                  <div className={`absolute inset-0 bg-gradient-to-b ${starter.bgGradient} transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-40'}`} />
                  {/* Halftone */}
                  <div className="absolute inset-0 halftone opacity-20" />

                  {/* Character */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                      className="w-3/4"
                    >
                      <Char className="w-full drop-shadow-[4px_4px_0_rgba(10,10,10,0.15)]" />
                    </motion.div>
                  </div>

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-ink-900/80 to-transparent">
                    <div className="font-display font-extrabold text-lg sm:text-xl text-cream-100">{starter.name}</div>
                    <div className="font-mono text-[10px] font-bold tracking-widest" style={{ color: starter.color }}>{starter.trait}</div>
                  </div>

                  {/* Active ring */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ boxShadow: isActive ? `0 0 30px ${starter.color}60` : 'none' }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Skill reveal */}
        <AnimatePresence mode="wait">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-10 max-w-2xl mx-auto"
            >
              <div className="flex flex-wrap justify-center gap-2 mb-5">
                {active.skills.map((skill) => (
                  <span key={skill} className="font-mono text-xs font-bold tracking-widest px-3 py-1.5 border-2 border-ink-900 rounded-full" style={{ backgroundColor: active.color + '20', color: '#0a0a0a' }}>
                    {skill}
                  </span>
                ))}
              </div>
              {selected && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm sm:text-base text-ink-700 leading-relaxed text-center p-5 bg-cream-100 border-2 border-ink-900 rounded-2xl"
                >
                  {active.description}
                </motion.p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

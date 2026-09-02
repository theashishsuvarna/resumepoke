import { motion } from 'framer-motion';
import { useState } from 'react';
import { PenTool, Code2, BrainCircuit, Palette } from 'lucide-react';

type AbilityGroup = {
  title: string;
  icon: typeof PenTool;
  color: string;
  bgColor: string;
  abilities: string[];
};

const ABILITY_GROUPS: AbilityGroup[] = [
  {
    title: 'DESIGN',
    icon: PenTool,
    color: '#ee1515',
    bgColor: '#ee151520',
    abilities: ['UI / UX', 'PRODUCT DESIGN', 'DESIGN SYSTEMS', 'PROTOTYPING'],
  },
  {
    title: 'BUILD',
    icon: Code2,
    color: '#3b82f6',
    bgColor: '#3b82f620',
    abilities: ['REACT', 'NEXT.JS', 'TYPESCRIPT', 'TAILWIND'],
  },
  {
    title: 'AI',
    icon: BrainCircuit,
    color: '#5fba7d',
    bgColor: '#5fba7d20',
    abilities: ['AI WORKFLOWS', 'DATA ANALYSIS', 'AUTOMATION', 'AI PRODUCT DESIGN'],
  },
  {
    title: 'CREATE',
    icon: Palette,
    color: '#ffcb05',
    bgColor: '#ffcb0520',
    abilities: ['FIGMA', 'PHOTOSHOP', 'ILLUSTRATOR', 'AFTER EFFECTS', 'PREMIERE PRO'],
  },
];

export default function Skills() {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-20 sm:py-28 px-5 sm:px-8 bg-cream-200 paper-grain overflow-hidden">
      {/* Decorative map markers */}
      <div className="absolute top-10 right-10 opacity-10">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeDasharray="6 8" />
          <circle cx="60" cy="60" r="30" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeDasharray="4 6" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold tracking-widest text-poke-red bg-cream-100 border-2 border-ink-900 px-3 py-1 rounded-full">SECTION 04</span>
            <span className="font-mono text-xs font-bold tracking-widest text-ink-700">ABILITIES</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[0.95] sm:leading-[0.9]">
            ABILITIES
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink-700 max-w-md">Each ability activates on hover. No boring percentage bars — just real skills, ready for battle.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {ABILITY_GROUPS.map((group, i) => {
            const Icon = group.icon;
            const isActive = activeGroup === group.title;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setActiveGroup(group.title)}
                onMouseLeave={() => setActiveGroup(null)}
                data-cursor="hover"
                className="group relative"
              >
                <div
                  className="relative p-6 sm:p-8 bg-cream-100 border-4 border-ink-900 rounded-3xl ink-border overflow-hidden transition-transform duration-300"
                  style={{ transform: isActive ? 'translateY(-6px)' : 'translateY(0)' }}
                >
                  {/* Glow background */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: group.bgColor, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Header */}
                  <div className="relative flex items-center justify-between mb-6">
                    <h3 className="font-display font-extrabold text-xl sm:text-3xl tracking-tight" style={{ color: group.color }}>
                      {group.title}
                    </h3>
                    <motion.div
                      animate={isActive ? { rotate: 360, scale: 1.2 } : { rotate: 0, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-ink-900"
                      style={{ backgroundColor: group.color + '30' }}
                    >
                      <Icon className="w-6 h-6" style={{ color: group.color }} strokeWidth={2.5} />
                    </motion.div>
                  </div>

                  {/* Abilities */}
                  <div className="relative grid grid-cols-2 gap-2">
                    {group.abilities.map((ability, j) => (
                      <motion.div
                        key={ability}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + j * 0.05 }}
                        className="flex items-center gap-2 p-2.5 bg-cream-50 border-2 border-ink-900 rounded-lg"
                      >
                        <motion.span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: group.color }}
                          animate={isActive ? { scale: [1, 1.4, 1] } : { scale: 1 }}
                          transition={{ duration: 0.6, repeat: isActive ? Infinity : 0, delay: j * 0.1 }}
                        />
                        <span className="font-mono text-[10px] sm:text-xs font-bold tracking-wider">{ability}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Active glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ boxShadow: isActive ? `0 0 30px ${group.color}40` : 'none' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

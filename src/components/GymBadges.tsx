import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PenTool, Layout, Code2, BrainCircuit, Palette, Film } from 'lucide-react';

type Badge = {
  id: string;
  title: string;
  icon: typeof PenTool;
  color: string;
  description: string;
  details: string;
};

const BADGES: Badge[] = [
  {
    id: 'product',
    title: 'PRODUCT DESIGN',
    icon: PenTool,
    color: '#ee1515',
    description: 'Badge earned through building end-to-end product experiences.',
    details: 'Designed and shipped 5 full product experiences across fintech, procurement, organization intelligence, payments, and community platforms. From problem discovery to final pixel — owning the entire product design lifecycle.',
  },
  {
    id: 'uiux',
    title: 'UI / UX',
    icon: Layout,
    color: '#3b82f6',
    description: 'Crafting interfaces people actually enjoy using.',
    details: 'Built design systems, interactive prototypes, and user flows that balance aesthetics with usability. Every interaction is intentional — from micro-interactions to information architecture.',
  },
  {
    id: 'webdev',
    title: 'WEB DEVELOPMENT',
    icon: Code2,
    color: '#5fba7d',
    description: 'Turning designs into real, working products.',
    details: 'React, Next.js, TypeScript, Tailwind CSS. Full frontend engineering — from component architecture to API integration. The bridge between design and deployment.',
  },
  {
    id: 'ai',
    title: 'AI',
    icon: BrainCircuit,
    color: '#ffcb05',
    description: 'Building with AI workflows and automation.',
    details: 'AI product design, data analysis, and automation workflows. Integrating AI into real products — not as a buzzword, but as a tool that makes experiences smarter and more useful.',
  },
  {
    id: 'graphic',
    title: 'GRAPHIC DESIGN',
    icon: Palette,
    color: '#ff5a3c',
    description: 'Visual communication across every medium.',
    details: 'Figma, Photoshop, Illustrator. From brand identity to marketing assets — creating visual systems that are consistent, expressive, and memorable.',
  },
  {
    id: 'video',
    title: 'VIDEO EDITING',
    icon: Film,
    color: '#9333ea',
    description: 'Motion and story through video.',
    details: 'After Effects and Premiere Pro. Bringing static designs to life through motion graphics, animation, and video storytelling.',
  },
];

export default function GymBadges() {
  const [activeBadge, setActiveBadge] = useState<Badge | null>(null);

  return (
    <section className="relative py-20 sm:py-28 px-5 sm:px-8 bg-cream-100 paper-grain overflow-hidden">
      {/* Map path background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none" viewBox="0 0 1440 800" preserveAspectRatio="none">
        <path d="M200 100 Q400 300 200 500 Q600 700 1000 400 Q1300 200 1200 600" fill="none" stroke="#0a0a0a" strokeWidth="4" strokeDasharray="10 14" />
      </svg>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold tracking-widest text-poke-red bg-cream-100 border-2 border-ink-900 px-3 py-1 rounded-full">SECTION 05</span>
            <span className="font-mono text-xs font-bold tracking-widest text-ink-700">GYM BADGES</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[0.95] sm:leading-[0.9]">
            GYM <span className="text-poke-red">BADGES</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink-700 max-w-md">Experience earned. Badges collected. Click each badge to reveal the story behind it.</p>
        </motion.div>

        {/* Badges grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-8">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon;
            const isActive = activeBadge?.id === badge.id;
            return (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
                onClick={() => setActiveBadge(isActive ? null : badge)}
                data-cursor="hover"
                className="group flex flex-col items-center cursor-pointer"
              >
                <motion.div
                  animate={isActive ? { rotate: 360, scale: 1.15 } : { rotate: 0, scale: 1 }}
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: isActive ? 0.6 : 0.2 }}
                  className="relative"
                >
                  {/* Badge outer ring */}
                  <div
                    className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center rounded-full border-4 border-ink-900"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${badge.color}, ${badge.color}cc)`,
                      boxShadow: `0 0 20px ${badge.color}40, inset 0 0 15px rgba(0,0,0,0.2)`,
                    }}
                  >
                    {/* Inner ring */}
                    <div className="absolute inset-2 rounded-full border-2 border-ink-900/30" />
                    {/* Icon */}
                    <Icon className="w-8 h-8 sm:w-12 sm:h-12 text-cream-100" strokeWidth={2.5} />
                    {/* Shine */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%)' }}
                      animate={{ opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                  </div>
                  {/* Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ boxShadow: `0 0 25px ${badge.color}60` }}
                    animate={{ opacity: isActive ? 1 : 0.3 }}
                  />
                </motion.div>

                {/* Label */}
                <div className="mt-3 text-center">
                  <div className="font-display font-bold text-xs sm:text-sm tracking-tight">{badge.title}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Badge detail reveal */}
        <AnimatePresence mode="wait">
          {activeBadge && (
            <motion.div
              key={activeBadge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-10 max-w-2xl mx-auto p-6 bg-cream-50 border-2 border-ink-900 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-4 h-4 rounded-full border-2 border-ink-900" style={{ backgroundColor: activeBadge.color }} />
                <h3 className="font-display font-extrabold text-xl" style={{ color: activeBadge.color }}>{activeBadge.title}</h3>
                <span className="font-mono text-[10px] font-bold tracking-widest text-ink-500 ml-auto">BADGE EARNED ✓</span>
              </div>
              <p className="text-sm sm:text-base text-ink-700 leading-relaxed">{activeBadge.details}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

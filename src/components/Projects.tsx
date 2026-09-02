import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';
import { PROJECTS, type Project } from '@/data/projects';
import { PROJECT_ARTS } from './ProjectArtworks';
import { X, ArrowRight, ExternalLink, Github } from 'lucide-react';

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="projects" className="relative py-20 sm:py-28 px-5 sm:px-8 bg-cream-50 paper-grain overflow-hidden">
      {/* Background route lines */}
      <svg className="absolute top-0 left-0 w-full h-full opacity-[0.04] pointer-events-none" viewBox="0 0 1440 2000" preserveAspectRatio="none">
        <path d="M720 0 Q600 400 720 800 Q840 1200 720 2000" fill="none" stroke="#0a0a0a" strokeWidth="4" strokeDasharray="10 16" />
      </svg>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold tracking-widest text-poke-red bg-cream-100 border-2 border-ink-900 px-3 py-1 rounded-full">SECTION 02</span>
            <span className="font-mono text-xs font-bold tracking-widest text-ink-700">MY TEAM</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[0.95] sm:leading-[0.9]">
            MY <span className="text-poke-red">TEAM</span>
          </h2>
          <p className="mt-4 font-display text-lg sm:text-xl text-ink-700 italic">"Different problems. Different abilities."</p>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-6 sm:space-y-8">
          {PROJECTS.map((project, i) => {
            const Art = PROJECT_ARTS[project.id];
            const isHovered = hoveredId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -60 : 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelected(project)}
                data-cursor="project"
                className={`group relative cursor-pointer ${i % 2 === 1 ? 'lg:ml-auto' : ''} lg:max-w-[85%]`}
              >
                <div
                  className={`relative grid md:grid-cols-[1.2fr_1fr] gap-0 bg-cream-100 border-4 border-ink-900 rounded-3xl overflow-hidden ink-border-lg transition-transform duration-500 ${
                    isHovered ? 'scale-[1.02]' : 'scale-100'
                  }`}
                >
                  {/* Artwork */}
                  <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[320px] overflow-hidden">
                    <motion.div
                      animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="w-full h-full"
                    >
                      {Art && <Art />}
                    </motion.div>
                    {/* Project number overlay */}
                    <div className="absolute top-4 left-4 font-display font-extrabold text-6xl text-cream-100/90 leading-none">
                      {project.number}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <motion.h3
                      animate={isHovered ? { x: 8 } : { x: 0 }}
                      className="font-display font-extrabold text-2xl sm:text-4xl tracking-tight"
                    >
                      {project.name}
                    </motion.h3>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold tracking-widest text-ink-500">ABILITY</span>
                        <span className="font-display font-bold text-sm" style={{ color: project.color }}>{project.ability}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold tracking-widest text-ink-500">STACK</span>
                        <span className="font-mono text-xs font-bold text-ink-900">{project.stack}</span>
                      </div>
                    </div>
                    <motion.div
                      animate={isHovered ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                      className="mt-5 flex items-center gap-2 font-display font-bold text-poke-red"
                    >
                      VIEW PROJECT <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Hover glow border */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{ boxShadow: isHovered ? `0 0 40px ${project.color}40` : 'none' }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {selected && <CaseStudy project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}

function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const Art = PROJECT_ARTS[project.id];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink-900/80 backdrop-blur-sm p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        ref={ref}
        initial={{ scale: 0.9, y: 40, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 40, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-cream-100 border-4 border-ink-900 rounded-3xl overflow-hidden ink-border-lg my-8"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          data-cursor="hover"
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-ink-900 text-cream-100 rounded-full border-2 border-ink-900 hover:bg-poke-red transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header artwork */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          {Art && <Art />}
          <div className="absolute inset-0 bg-gradient-to-t from-cream-100 to-transparent" />
          <div className="absolute bottom-4 left-6">
            <span className="font-mono text-xs font-bold tracking-widest text-cream-100 bg-ink-900/60 px-3 py-1 rounded-full">PROJECT {project.number}</span>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          {/* Title block */}
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl tracking-tight" style={{ color: project.color }}>
            {project.name}
          </h2>
          {project.tagline && (
            <p className="mt-2 font-display text-base sm:text-lg text-ink-700 italic">{project.tagline}</p>
          )}

          {/* Action buttons */}
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live demo of ${project.name} in a new tab`}
              data-cursor="hover"
              className="group relative overflow-hidden inline-flex items-center gap-2 bg-poke-red text-cream-100 font-display font-bold text-sm px-5 py-3 border-2 border-ink-900 rounded-xl ink-border hover:scale-105 transition-transform"
            >
              <span className="relative z-10 flex items-center gap-2">
                LIVE DEMO
                <motion.span
                  className="inline-flex"
                  whileHover={{ rotate: [0, -15, 15, 0], scale: 1.3 }}
                  transition={{ duration: 0.4 }}
                >
                  <ExternalLink className="w-4 h-4" />
                </motion.span>
              </span>
            </a>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open GitHub repository of ${project.name} in a new tab`}
                data-cursor="hover"
                className="group relative overflow-hidden inline-flex items-center gap-2 bg-ink-900 text-cream-100 font-display font-bold text-sm px-5 py-3 border-2 border-ink-900 rounded-xl ink-border hover:scale-105 transition-transform"
              >
                <span className="relative z-10 flex items-center gap-2">
                  GITHUB
                  <Github className="w-4 h-4" />
                </span>
              </a>
            )}
          </div>

          {/* Meta grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'PROJECT NUMBER', value: project.number },
              { label: 'ROLE', value: project.role },
              { label: 'YEAR', value: project.year },
              { label: 'STACK', value: project.stack },
            ].map((m) => (
              <div key={m.label} className="p-3 bg-cream-50 border-2 border-ink-900 rounded-xl">
                <div className="font-mono text-[9px] font-bold tracking-widest text-ink-500">{m.label}</div>
                <div className="font-display font-bold text-sm mt-1">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Sections */}
          <div className="mt-8 space-y-8">
            {[
              { title: 'THE PROBLEM', text: project.problem, color: '#ee1515' },
              { title: 'THE IDEA', text: project.idea, color: '#3b82f6' },
              { title: 'THE DESIGN', text: project.design, color: '#5fba7d' },
              { title: 'THE BUILD', text: project.build, color: '#ffcb05' },
              { title: 'THE RESULT', text: project.result, color: '#ff5a3c' },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="scroll-mt-4"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-3 h-3 rounded-full border-2 border-ink-900" style={{ backgroundColor: s.color }} />
                  <h3 className="font-display font-extrabold text-lg tracking-tight">{s.title}</h3>
                </div>
                <p className="text-sm sm:text-base text-ink-700 leading-relaxed pl-6">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

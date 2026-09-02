import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';

const CERTS = [
  { title: 'Software Engineer', issuer: 'HackerRank', icon: 'code' },
  { title: 'Frontend Developer — React', issuer: 'HackerRank', icon: 'react' },
  { title: 'SQL Advanced', issuer: 'HackerRank', icon: 'database' },
  { title: 'Product Management', issuer: 'GeeksforGeeks', icon: 'product' },
  { title: 'Foundations of Cybersecurity', issuer: 'Google / Coursera', icon: 'shield' },
  { title: 'Generative AI & ChatGPT', issuer: 'Certified', icon: 'ai' },
  { title: 'Machine Learning & Data Science', issuer: 'Certified', icon: 'ml' },
];

export default function Certifications() {
  return (
    <section className="relative py-20 sm:py-28 px-5 sm:px-8 bg-cream-50 paper-grain overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold tracking-widest text-poke-red bg-cream-100 border-2 border-ink-900 px-3 py-1 rounded-full">SECTION 06</span>
            <span className="font-mono text-xs font-bold tracking-widest text-ink-700">ACHIEVEMENTS</span>
          </div>
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl tracking-tight leading-[0.95] sm:leading-[0.9]">
            ACHIEVEMENTS
            <br />
            <span className="text-poke-red">UNLOCKED</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-ink-700 max-w-md">Certifications collected. Each one a checkpoint passed on the journey.</p>
        </motion.div>

        {/* Horizontal scroll collection */}
        <div className="relative">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
            {CERTS.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                data-cursor="hover"
                className="group snap-start shrink-0 w-56 sm:w-72"
              >
                <div className="relative h-40 sm:h-44 bg-cream-100 border-4 border-ink-900 rounded-2xl ink-border p-4 sm:p-5 flex flex-col justify-between overflow-hidden hover:bg-poke-yellow/10 transition-colors">
                  {/* Achievement unlocked banner */}
                  <div className="flex items-center gap-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 + 0.2, type: 'spring' }}
                      className="w-7 h-7 flex items-center justify-center bg-poke-green rounded-full border-2 border-ink-900"
                    >
                      <CheckCircle2 className="w-4 h-4 text-cream-100" strokeWidth={3} />
                    </motion.div>
                    <span className="font-mono text-[9px] font-bold tracking-widest text-ink-500">ACHIEVEMENT UNLOCKED ✓</span>
                  </div>

                  {/* Award icon */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                    className="absolute top-12 right-4 opacity-15"
                  >
                    <Award className="w-16 h-16 text-poke-yellow" strokeWidth={1.5} />
                  </motion.div>

                  {/* Title */}
                  <div>
                    <h3 className="font-display font-extrabold text-base sm:text-lg leading-tight tracking-tight">{cert.title}</h3>
                    <div className="font-mono text-[10px] font-bold tracking-widest text-ink-500 mt-1">{cert.issuer}</div>
                  </div>

                  {/* Number */}
                  <div className="absolute top-3 right-3 font-display font-extrabold text-3xl text-ink-900/10 leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Halftone corner */}
                  <div className="absolute bottom-0 left-0 w-20 h-20 halftone-red opacity-30" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Scroll hint */}
          <div className="flex items-center gap-2 mt-4 font-mono text-[10px] font-bold tracking-widest text-ink-500">
            <motion.div
              animate={{ x: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.div>
            SCROLL TO COLLECT ALL
          </div>
        </div>
      </div>
    </section>
  );
}

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Download } from 'lucide-react';
import { EeveeChar } from './PokemonChars';

const RESUME_URL = 'https://drive.google.com/file/d/1LQcWFsFWnc_CWPGgFd7gKtz7oFxFswsA/view';

export default function TrainerProfile() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scanY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="trainer" ref={ref} className="relative min-h-screen py-20 sm:py-28 px-5 sm:px-8 bg-cream-100 paper-grain overflow-hidden">
      {/* Decorative route line */}
      <svg className="absolute top-10 left-0 w-full h-32 opacity-20 pointer-events-none" viewBox="0 0 1440 100" preserveAspectRatio="none">
        <path d="M0 50 Q360 10 720 50 Q1080 90 1440 50" fill="none" stroke="#0a0a0a" strokeWidth="3" strokeDasharray="8 12" />
      </svg>

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <span className="font-mono text-xs font-bold tracking-widest text-poke-red bg-cream-100 border-2 border-ink-900 px-3 py-1 rounded-full">SECTION 01</span>
          <span className="font-mono text-xs font-bold tracking-widest text-ink-700">TRAINER PROFILE</span>
          <div className="flex-1 h-0.5 bg-ink-900/20" />
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12 items-center">
          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative perspective-1000"
          >
            <div className="relative aspect-[3/4] bg-cream-200 border-4 border-ink-900 ink-border-lg rounded-3xl overflow-hidden">
              {/* Halftone texture */}
              <div className="absolute inset-0 halftone opacity-30" />

              {/* Portrait placeholder — stylized character */}
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-sky-200 to-cream-300">
                <EeveeChar className="w-3/4 drop-shadow-[6px_6px_0_rgba(10,10,10,0.15)]" />
              </div>

              {/* Scan line */}
              <motion.div
                style={{ top: scanY }}
                className="absolute left-0 right-0 h-1 bg-poke-red/60 shadow-[0_0_20px_rgba(238,21,21,0.5)]"
              />

              {/* Corner markers */}
              <div className="absolute top-3 left-3 w-6 h-6 border-l-4 border-t-4 border-ink-900" />
              <div className="absolute top-3 right-3 w-6 h-6 border-r-4 border-t-4 border-ink-900" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-l-4 border-b-4 border-ink-900" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-r-4 border-b-4 border-ink-900" />

              {/* ID badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-ink-900/80 backdrop-blur-sm rounded-xl px-4 py-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold tracking-widest text-cream-100">TRAINER NO.</span>
                  <span className="font-display font-extrabold text-poke-yellow text-lg">#001</span>
                </div>
              </div>
            </div>

            {/* Floating label */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 bg-poke-red text-cream-100 font-mono text-xs font-bold px-4 py-2 border-2 border-ink-900 ink-border rounded-xl"
            >
              DATA REGISTERED ✓
            </motion.div>
          </motion.div>

          {/* Info panel */}
          <motion.div style={{ y }}>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-7xl leading-[0.95] sm:leading-[0.9] tracking-tight"
            >
              ASHISH
              <br />
              <span className="text-poke-red">SUVARNA</span>
            </motion.h2>

            <div className="mt-8 space-y-4">
              <InfoRow label="CLASS" value="PRODUCT DESIGNER / BUILDER" />
              <InfoRow label="REGION" value="NAVI MUMBAI" />
              <InfoRow label="SPECIALITY" value="DESIGN × CODE × AI" />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-5 bg-cream-50 border-2 border-ink-900 rounded-2xl"
            >
              <p className="text-sm sm:text-base text-ink-700 leading-relaxed">
                Ashish combines UX design, modern frontend engineering and AI workflows to build
                scalable digital products across fintech, creator economy and community platforms.
                He lives where design systems meet shipping code — turning complex problems into
                interfaces people actually enjoy using.
              </p>
            </motion.div>

            {/* Resume button */}
            <motion.a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Ashish Suvarna's resume (opens in a new tab)"
              data-cursor="hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              whileHover={{ scale: 1.03 }}
              className="mt-6 inline-flex items-center gap-2 bg-ink-900 text-cream-100 font-display font-bold text-sm px-6 py-3 border-2 border-ink-900 rounded-xl ink-border hover:bg-poke-red transition-colors"
            >
              <Download className="w-4 h-4" />
              DOWNLOAD RESUME
            </motion.a>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { val: '5', label: 'PROJECTS SHIPPED' },
                { val: '7+', label: 'CERTIFICATIONS' },
                { val: '∞', label: 'IDEAS BREWING' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                  className="text-center p-3 bg-cream-200 border-2 border-ink-900 rounded-xl"
                >
                  <div className="font-display font-extrabold text-2xl text-poke-red">{stat.val}</div>
                  <div className="font-mono text-[9px] font-bold tracking-widest text-ink-700 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 p-3 bg-cream-50 border-2 border-ink-900 rounded-xl"
    >
      <span className="font-mono text-[10px] font-bold tracking-widest text-ink-500 w-24 shrink-0">{label}</span>
      <span className="font-display font-bold text-base sm:text-lg text-ink-900">{value}</span>
    </motion.div>
  );
}

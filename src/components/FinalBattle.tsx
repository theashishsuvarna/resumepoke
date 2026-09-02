import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, ArrowUpRight, Download } from 'lucide-react';
import { PikachuChar } from './PokemonChars';
import { PokeBall } from './PokeBall';

const RESUME_URL = 'https://drive.google.com/file/d/1LQcWFsFWnc_CWPGgFd7gKtz7oFxFswsA/view';
const LINKEDIN_URL = 'https://www.linkedin.com/in/ashishhsuvarna';

export default function FinalBattle() {
  return (
    <section id="final" className="relative min-h-screen py-20 sm:py-28 px-5 sm:px-8 bg-ink-900 overflow-hidden flex items-center justify-center">
      {/* Giant Poké Ball background */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] sm:w-[80vw] aspect-square pointer-events-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
          <circle cx="50" cy="50" r="48" fill="none" stroke="#fdf9ee" strokeWidth="1.5" />
          <path d="M2 50 A48 48 0 0 1 98 50 Z" fill="#ee1515" />
          <rect x="2" y="48" width="96" height="4" fill="#fdf9ee" />
          <circle cx="50" cy="50" r="14" fill="none" stroke="#fdf9ee" strokeWidth="1.5" />
        </svg>
      </motion.div>

      {/* Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-cream-100"
            style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.5, 1] }}
            transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs font-bold tracking-widest text-poke-yellow bg-ink-800 px-4 py-1.5 rounded-full border-2 border-poke-yellow/30 inline-block mb-6"
        >
          FINAL DESTINATION
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-display font-extrabold text-4xl sm:text-6xl lg:text-8xl leading-[0.95] sm:leading-[0.88] tracking-tight text-cream-100"
        >
          READY FOR THE
          <br />
          NEXT <span className="text-poke-red">ADVENTURE?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-6 font-display text-xl sm:text-2xl text-cream-300"
        >
          LET'S BUILD SOMETHING.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full max-w-md sm:max-w-none mx-auto"
        >
          <a
            href="mailto:ashishsuvarna@example.com"
            data-cursor="hover"
            className="group relative overflow-hidden bg-poke-red text-cream-100 font-display font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-cream-100 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform w-full sm:w-auto"
          >
            START A PROJECT
            <ArrowUpRight className="w-5 h-5" />
          </a>
          <a
            href="mailto:ashishsuvarna@example.com"
            data-cursor="hover"
            className="bg-cream-100 text-ink-900 font-display font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-cream-100 rounded-xl flex items-center justify-center gap-2 hover:bg-poke-yellow transition-colors w-full sm:w-auto"
          >
            <Mail className="w-5 h-5" /> EMAIL ME
          </a>
          <a
            href={RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download resume (opens in a new tab)"
            data-cursor="hover"
            className="bg-transparent text-cream-100 font-display font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 border-2 border-cream-100 rounded-xl flex items-center justify-center gap-2 hover:bg-cream-100 hover:text-ink-900 transition-colors w-full sm:w-auto"
          >
            <Download className="w-5 h-5" /> DOWNLOAD RESUME
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-8 flex justify-center gap-4"
        >
          {[
            { icon: Mail, label: 'EMAIL', href: 'mailto:ashishsuvarna@example.com', external: false },
            { icon: Linkedin, label: 'LINKEDIN', href: LINKEDIN_URL, external: true },
            { icon: Github, label: 'GITHUB', href: 'https://github.com/theashishsuvarna', external: true },
          ].map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={link.external ? `Open ${link.label} in a new tab` : `Send an email`}
                data-cursor="hover"
                className="group flex flex-col items-center gap-1.5"
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.1 }}
                  className="w-12 h-12 flex items-center justify-center bg-ink-800 text-cream-100 rounded-full border-2 border-cream-100/20 hover:border-poke-red hover:text-poke-red transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>
                <span className="font-mono text-[9px] font-bold tracking-widest text-cream-300">{link.label}</span>
              </a>
            );
          })}
        </motion.div>

        {/* Waving Pikachu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9 }}
          className="mt-12 flex justify-center"
        >
          <motion.div
            animate={{ rotate: [0, -10, 10, 0], y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 sm:w-24"
          >
            <PikachuChar className="w-full" />
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-center z-10">
        <div className="font-display font-extrabold text-lg sm:text-xl text-cream-100">ASHISH SUVARNA</div>
        <div className="font-mono text-[10px] font-bold tracking-widest text-cream-300 mt-1">
          PRODUCT DESIGNER · BUILDER · CREATIVE TECHNOLOGIST
        </div>
      </div>
    </section>
  );
}

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { PokeBall } from './PokeBall';

export default function PokeBallLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-900"
        >
          <div className="flex flex-col items-center gap-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20"
            >
              <PokeBall className="w-full h-full drop-shadow-[0_0_20px_rgba(238,21,21,0.5)]" size={80} />
            </motion.div>
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="font-mono text-xs font-bold tracking-[0.3em] text-cream-100"
            >
              LOADING WORLD...
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

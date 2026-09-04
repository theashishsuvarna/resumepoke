import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGame } from './GameContext';
import { REGIONS } from './gameData';

export function LoadingScreen() {
  const { loading, setLoading, discoverRegion } = useGame();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'loading' | 'discovered'>('loading');

  useEffect(() => {
    if (!loading) return;
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15 + 5;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTimeout(() => setPhase('discovered'), 300);
        setTimeout(() => { discoverRegion('village'); setLoading(false); }, 1800);
      }
      setProgress(Math.min(p, 100));
    }, 200);
    return () => clearInterval(interval);
  }, [loading, setLoading, discoverRegion]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[500] flex flex-col items-center justify-center bg-slate-950"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/4 w-[150%] h-[150%] bg-gradient-to-br from-emerald-900/30 via-slate-950 to-blue-900/30 animate-pulse" />
          </div>
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i} className="absolute w-1 h-1 rounded-full bg-amber-400/40"
              style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
              animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
          <div className="relative z-10 text-center">
            {phase === 'loading' ? (
              <>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-3xl sm:text-5xl font-bold text-white tracking-tight mb-2">
                  ENTERING ASHISH'S WORLD
                </motion.h1>
                <p className="text-sm font-mono text-white/40 tracking-widest mb-8">LOADING ADVENTURE</p>
                <div className="w-64 sm:w-80 h-2 rounded-full bg-white/10 overflow-hidden mx-auto">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400" style={{ width: `${progress}%` }} />
                </div>
                <div className="mt-3 text-xs font-mono text-white/30">{Math.floor(progress)}%</div>
              </>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-amber-400 border-t-transparent" />
                <h2 className="text-2xl sm:text-4xl font-bold text-amber-400 tracking-tight mb-1">VILLAGE DISCOVERED</h2>
                <p className="text-sm font-mono text-white/40 tracking-widest">{REGIONS[0].subtitle}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

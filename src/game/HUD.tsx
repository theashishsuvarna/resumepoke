import { motion, AnimatePresence } from 'framer-motion';
import { Map, Award, Settings, X, Compass, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useGame } from './GameContext';
import { REGIONS, type RegionId } from './gameData';

export function HUD() {
  const { currentRegion, discovered, badges, paused, setPaused, fastTravel, setAccessibleMode, lastDiscovered, clearLastDiscovered } = useGame();
  const [mapOpen, setMapOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  const region = REGIONS.find((r) => r.id === currentRegion);

  // Discovery notification
  useEffect(() => {
    if (lastDiscovered) {
      const t = setTimeout(() => clearLastDiscovered(), 3500);
      return () => clearTimeout(t);
    }
  }, [lastDiscovered, clearLastDiscovered]);

  const discoveredRegion = lastDiscovered ? REGIONS.find((r) => r.id === lastDiscovered) : null;

  return (
    <>
      <div className="fixed top-4 left-4 z-[100] pointer-events-none">
        <AnimatePresence mode="wait">
          {region && (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/20"
            >
              <div className="text-xs font-mono font-bold tracking-widest text-white/50">LOCATION</div>
              <div className="text-sm font-bold text-white">{region.name}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="fixed top-4 right-4 z-[100] flex gap-2">
        <HudButton onClick={() => setMapOpen(true)} icon={Map} label="Map" />
        <HudButton onClick={() => setSettingsOpen(true)} icon={Settings} label="Settings" />
      </div>

      <div className="fixed bottom-4 left-4 z-[100] flex gap-2">
        <div className="px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono font-bold text-white">{discovered.size}/{REGIONS.length}</span>
        </div>
        <div className="px-3 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/20 flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono font-bold text-white">{badges.size}</span>
        </div>
      </div>

      <div className="fixed bottom-4 right-4 z-[100] hidden md:block">
        <div className="px-4 py-3 rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-right">
          <div className="text-[10px] font-mono text-white/40 tracking-widest mb-1">CONTROLS</div>
          <div className="text-[11px] font-mono text-white/60">
            WASD move · SHIFT sprint · SPACE jump · E interact · MOUSE camera
          </div>
        </div>
      </div>

      <InteractPrompt />

      {/* Discovery notification */}
      <AnimatePresence>
        {discoveredRegion && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[120] pointer-events-none"
          >
            <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/20 shadow-2xl">
              <Sparkles className="w-6 h-6" style={{ color: discoveredRegion.color }} />
              <div className="text-center">
                <div className="text-xs font-mono font-bold tracking-widest text-white/50">DISCOVERED</div>
                <div className="text-lg font-bold text-white">{discoveredRegion.name}</div>
                <div className="text-[10px] font-mono text-white/40">{discoveredRegion.subtitle}</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mapOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setMapOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-2xl bg-slate-900/95 border border-white/20 p-6"
            >
              <button onClick={() => setMapOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold text-white mb-1">WORLD MAP</h2>
              <p className="text-xs font-mono text-white/40 mb-4">{discovered.size} / {REGIONS.length} DISCOVERED</p>
              <div className="space-y-2">
                {REGIONS.map((r) => {
                  const isDiscovered = discovered.has(r.id as RegionId);
                  const isCurrent = currentRegion === r.id;
                  return (
                    <button
                      key={r.id}
                      disabled={!isDiscovered}
                      onClick={() => { if (isDiscovered) { fastTravel(r.id); setMapOpen(false); } }}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                        isCurrent ? 'bg-white/15 border-white/40'
                        : isDiscovered ? 'bg-white/5 border-white/10 hover:bg-white/10'
                        : 'bg-black/30 border-white/5 opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: isDiscovered ? r.color : '#444' }} />
                      <div className="text-left flex-1">
                        <div className="text-sm font-bold text-white">{isDiscovered ? r.name : '???'}</div>
                        <div className="text-[10px] font-mono text-white/40">{isDiscovered ? r.subtitle : 'Undiscovered'}</div>
                      </div>
                      {isCurrent && <span className="text-[10px] font-mono text-amber-400">HERE</span>}
                      {isDiscovered && !isCurrent && <span className="text-[10px] font-mono text-emerald-400">TRAVEL</span>}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setSettingsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-2xl bg-slate-900/95 border border-white/20 p-6"
            >
              <button onClick={() => setSettingsOpen(false)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold text-white mb-4">SETTINGS</h2>
              <div className="space-y-3">
                <button onClick={() => setMuted(!muted)} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-sm text-white">Audio</span>
                  {muted ? <VolumeX className="w-5 h-5 text-white/40" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
                </button>
                <button onClick={() => { setAccessibleMode(true); setSettingsOpen(false); }} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-sm text-white">Accessible Mode</span>
                  <span className="text-[10px] font-mono text-white/40">2D VIEW</span>
                </button>
                <button onClick={() => { setPaused(true); setSettingsOpen(false); }} className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <span className="text-sm text-white">Pause</span>
                  <span className="text-[10px] font-mono text-white/40">ESC</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {paused && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 backdrop-blur-md"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">PAUSED</h2>
              <button onClick={() => setPaused(false)} className="px-6 py-3 rounded-xl bg-white text-slate-900 font-bold text-sm hover:bg-amber-400 transition-colors">
                RESUME
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function HudButton({ onClick, icon: Icon, label }: { onClick: () => void; icon: typeof Map; label: string }) {
  return (
    <button onClick={onClick} className="w-11 h-11 flex items-center justify-center rounded-xl bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 transition-colors" aria-label={label}>
      <Icon className="w-5 h-5" />
    </button>
  );
}

function InteractPrompt() {
  const { nearbyInteractable, setActivePanel } = useGame();
  return (
    <AnimatePresence>
      {nearbyInteractable && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[100] md:bottom-24"
        >
          <button onClick={() => setActivePanel(nearbyInteractable)} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/20 text-white hover:bg-white/15 transition-colors">
            <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-400 text-slate-900 font-bold text-sm">E</span>
            <span className="text-sm font-bold">{nearbyInteractable.label}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

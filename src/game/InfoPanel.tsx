import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, Download, Award, Zap, Code2, PenTool, BrainCircuit, Palette, Film, Layout } from 'lucide-react';
import { useGame, type InteractableInfo } from './GameContext';
import { PROJECTS, SKILL_GROUPS, BADGES, CERTS, TRAINER } from './gameData';

const ICONS: Record<string, typeof PenTool> = {
  product: PenTool, uiux: Layout, webdev: Code2, ai: BrainCircuit,
  graphic: Palette, video: Film,
};

export function InfoPanel() {
  const { activePanel, setActivePanel, earnBadge } = useGame();
  return (
    <AnimatePresence>
      {activePanel && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-black/60 backdrop-blur-md"
          onClick={() => setActivePanel(null)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 40, opacity: 0 }} animate={{ scale: 1, y: 0, opacity: 1 }} exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/20 bg-slate-900/90 shadow-2xl"
          >
            <button onClick={() => setActivePanel(null)} className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-red-500 transition-colors" aria-label="Close panel">
              <X className="w-5 h-5" />
            </button>
            <PanelContent info={activePanel} earnBadge={earnBadge} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function PanelContent({ info, earnBadge }: { info: InteractableInfo; earnBadge: (id: string) => void }) {
  if (info.type === 'project') {
    const p = PROJECTS.find((x) => x.id === info.id);
    if (!p) return null;
    return (
      <div>
        <div className="h-32 sm:h-40 relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.color}40, ${p.bgColor})` }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-6xl sm:text-8xl font-bold opacity-20" style={{ color: p.color }}>{p.number}</span>
          </div>
          <div className="absolute bottom-4 left-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: p.color }}>{p.name}</h2>
            <p className="text-sm text-white/60 italic mt-1">{p.tagline}</p>
          </div>
        </div>
        <div className="p-6 sm:p-8 space-y-5">
          <div className="flex flex-wrap gap-2">
            <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white" style={{ backgroundColor: p.color }}>
              LIVE DEMO <ExternalLink className="w-4 h-4" />
            </a>
            {p.githubUrl && (
              <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-white/10 text-white border border-white/20">
                GITHUB <Github className="w-4 h-4" />
              </a>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{ l: 'ABILITY', v: p.ability }, { l: 'STACK', v: p.stack }, { l: 'ROLE', v: p.role }, { l: 'YEAR', v: p.year }].map((m) => (
              <div key={m.l} className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-[9px] font-mono font-bold tracking-widest text-white/40">{m.l}</div>
                <div className="text-xs font-bold text-white mt-1">{m.v}</div>
              </div>
            ))}
          </div>
          {[
            { t: 'THE PROBLEM', c: p.problem, col: '#ee1515' },
            { t: 'THE IDEA', c: p.idea, col: '#3b82f6' },
            { t: 'THE DESIGN', c: p.design, col: '#5fba7d' },
            { t: 'THE BUILD', c: p.build, col: '#ffcb05' },
            { t: 'THE RESULT', c: p.result, col: '#ff5a3c' },
          ].map((s) => (
            <div key={s.t}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.col }} />
                <h3 className="text-sm font-bold tracking-tight text-white">{s.t}</h3>
              </div>
              <p className="text-sm text-white/70 leading-relaxed pl-5">{s.c}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (info.type === 'skill') {
    const s = SKILL_GROUPS.find((x) => x.title === info.id);
    if (!s) return null;
    return (
      <div className="p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: s.color + '30' }}>
            <Zap className="w-6 h-6" style={{ color: s.color }} />
          </div>
          <div>
            <h2 className="text-2xl font-bold" style={{ color: s.color }}>{s.title}</h2>
            <p className="text-xs font-mono text-white/40 tracking-widest">SKILL DISCOVERED</p>
          </div>
        </div>
        <p className="text-sm text-white/70 leading-relaxed mb-5">{s.description}</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {s.abilities.map((a) => (
            <div key={a} className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-center">
              <span className="text-xs font-bold text-white">{a}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (info.type === 'badge') {
    const b = BADGES.find((x) => x.id === info.id);
    if (!b) return null;
    const Icon = ICONS[b.id] || Award;
    earnBadge(b.id);
    return (
      <div className="p-6 sm:p-8 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-24 h-24 mx-auto rounded-full flex items-center justify-center border-4 mb-4"
          style={{ backgroundColor: b.color, borderColor: b.color }}
        >
          <Icon className="w-12 h-12 text-white" strokeWidth={2.5} />
        </motion.div>
        <h2 className="text-2xl font-bold text-white mb-1">{b.title}</h2>
        <p className="text-xs font-mono text-white/40 tracking-widest mb-4">BADGE EARNED</p>
        <p className="text-sm text-white/70 leading-relaxed max-w-md mx-auto">{b.details}</p>
      </div>
    );
  }

  if (info.type === 'cert') {
    const c = CERTS.find((x) => x.title === info.id);
    if (!c) return null;
    return (
      <div className="p-6 sm:p-8 text-center">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-amber-400/20 border-4 border-amber-400 mb-4"
        >
          <Award className="w-10 h-10 text-amber-400" strokeWidth={2} />
        </motion.div>
        <h2 className="text-xl font-bold text-white mb-1">{c.title}</h2>
        <p className="text-sm text-amber-400 font-mono tracking-widest mb-4">{c.issuer}</p>
        <p className="text-xs font-mono text-white/40 tracking-widest">ACHIEVEMENT UNLOCKED</p>
      </div>
    );
  }

  if (info.type === 'trainer') {
    return (
      <div className="p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="inline-block px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-400 text-xs font-mono font-bold tracking-widest mb-3">TRAINER PROFILE</div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">{TRAINER.name}</h2>
          <p className="text-lg text-white/60 mt-2">{TRAINER.role}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
          <InfoRow label="CLASS" val={TRAINER.class} />
          <InfoRow label="REGION" val={TRAINER.region} />
          <InfoRow label="SPECIALITY" val={TRAINER.speciality} />
        </div>
        <p className="text-sm text-white/70 leading-relaxed mb-5 p-4 rounded-lg bg-white/5 border border-white/10">{TRAINER.bio}</p>
        <div className="grid grid-cols-3 gap-3 mb-5">
          {TRAINER.stats.map((s) => (
            <div key={s.label} className="text-center p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-2xl font-bold" style={{ color: '#ee1515' }}>{s.val}</div>
              <div className="text-[9px] font-mono font-bold tracking-widest text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <a href={TRAINER.links.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-white text-slate-900 hover:bg-amber-400 transition-colors">
            <Download className="w-4 h-4" /> RESUME
          </a>
          <a href={TRAINER.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-white/10 text-white border border-white/20">LINKEDIN</a>
          <a href={TRAINER.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-white/10 text-white border border-white/20">GITHUB</a>
          <a href={TRAINER.links.email} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-white/10 text-white border border-white/20">EMAIL</a>
        </div>
      </div>
    );
  }

  return null;
}

function InfoRow({ label, val }: { label: string; val: string }) {
  return (
    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
      <div className="text-[9px] font-mono font-bold tracking-widest text-white/40">{label}</div>
      <div className="text-sm font-bold text-white mt-1">{val}</div>
    </div>
  );
}

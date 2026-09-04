import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Download, Mail, Linkedin, Award, Zap } from 'lucide-react';
import { useGame } from './GameContext';
import { PROJECTS, SKILL_GROUPS, BADGES, CERTS, TRAINER } from './gameData';

type Tab = 'projects' | 'skills' | 'badges' | 'certs' | 'profile';

export function AccessibleMode() {
  const { accessibleMode, setAccessibleMode } = useGame();
  const [tab, setTab] = useState<Tab>('projects');
  if (!accessibleMode) return null;

  return (
    <div className="fixed inset-0 z-[400] bg-slate-950 overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Portfolio Explorer</h1>
            <p className="text-xs font-mono text-white/40">Accessible 2D Mode</p>
          </div>
          <button onClick={() => setAccessibleMode(false)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-bold hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-4 h-4" /> 3D WORLD
          </button>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {([
            { id: 'projects' as const, label: 'PROJECTS', count: PROJECTS.length },
            { id: 'skills' as const, label: 'SKILLS', count: SKILL_GROUPS.length },
            { id: 'badges' as const, label: 'BADGES', count: BADGES.length },
            { id: 'certs' as const, label: 'CERTIFICATIONS', count: CERTS.length },
            { id: 'profile' as const, label: 'PROFILE', count: null },
          ]).map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${tab === t.id ? 'bg-amber-400 text-slate-900' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
              {t.label}{t.count !== null && <span className="ml-2 text-xs opacity-50">{t.count}</span>}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {tab === 'projects' && (
              <div className="space-y-4">
                {PROJECTS.map((p) => (
                  <div key={p.id} className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold" style={{ color: p.color }}>{p.name}</h3>
                        <p className="text-sm text-white/50 italic">{p.tagline}</p>
                      </div>
                      <span className="text-2xl font-bold opacity-20" style={{ color: p.color }}>{p.number}</span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                      <Meta label="ABILITY" val={p.ability} />
                      <Meta label="STACK" val={p.stack} />
                      <Meta label="ROLE" val={p.role} />
                      <Meta label="YEAR" val={p.year} />
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed mb-3">{p.problem} {p.idea} {p.result}</p>
                    <div className="flex gap-2">
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: p.color }}>LIVE <ExternalLink className="w-3 h-3" /></a>
                      {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-white/10 text-white border border-white/20">GITHUB <Github className="w-3 h-3" /></a>}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'skills' && (
              <div className="grid sm:grid-cols-2 gap-4">
                {SKILL_GROUPS.map((s) => (
                  <div key={s.title} className="p-5 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap className="w-5 h-5" style={{ color: s.color }} />
                      <h3 className="text-lg font-bold" style={{ color: s.color }}>{s.title}</h3>
                    </div>
                    <p className="text-sm text-white/70 mb-3">{s.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {s.abilities.map((a) => <span key={a} className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white">{a}</span>)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === 'badges' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {BADGES.map((b) => (
                  <div key={b.id} className="p-4 rounded-xl bg-white/5 border border-white/10 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: b.color }}>
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-white">{b.title}</h3>
                    <p className="text-[10px] text-white/40 mt-1">{b.description}</p>
                  </div>
                ))}
              </div>
            )}
            {tab === 'certs' && (
              <div className="space-y-3">
                {CERTS.map((c, i) => (
                  <div key={c.title} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-2xl font-bold text-white/10">{String(i + 1).padStart(2, '0')}</span>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white">{c.title}</h3>
                      <p className="text-xs text-amber-400 font-mono">{c.issuer}</p>
                    </div>
                    <Award className="w-5 h-5 text-amber-400" />
                  </div>
                ))}
              </div>
            )}
            {tab === 'profile' && (
              <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                <h2 className="text-3xl font-bold text-white mb-1">{TRAINER.name}</h2>
                <p className="text-lg text-white/60 mb-4">{TRAINER.role}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  <Meta label="CLASS" val={TRAINER.class} />
                  <Meta label="REGION" val={TRAINER.region} />
                  <Meta label="SPECIALITY" val={TRAINER.speciality} />
                </div>
                <p className="text-sm text-white/70 leading-relaxed mb-4">{TRAINER.bio}</p>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {TRAINER.stats.map((s) => (
                    <div key={s.label} className="text-center p-3 rounded-lg bg-white/5">
                      <div className="text-2xl font-bold" style={{ color: '#ee1515' }}>{s.val}</div>
                      <div className="text-[9px] font-mono text-white/40">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href={TRAINER.links.resume} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-white text-slate-900"><Download className="w-4 h-4" /> RESUME</a>
                  <a href={TRAINER.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-white/10 text-white border border-white/20"><Linkedin className="w-4 h-4" /> LINKEDIN</a>
                  <a href={TRAINER.links.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-white/10 text-white border border-white/20"><Github className="w-4 h-4" /> GITHUB</a>
                  <a href={TRAINER.links.email} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold bg-white/10 text-white border border-white/20"><Mail className="w-4 h-4" /> EMAIL</a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Meta({ label, val }: { label: string; val: string }) {
  return (
    <div className="p-2 rounded-lg bg-white/5 border border-white/10">
      <div className="text-[9px] font-mono font-bold tracking-widest text-white/40">{label}</div>
      <div className="text-xs font-bold text-white mt-0.5">{val}</div>
    </div>
  );
}

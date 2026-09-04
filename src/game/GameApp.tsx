import { useRef, useEffect, useState } from 'react';
import { GameProvider, useGame } from './GameContext';
import { GameScene } from './GameScene';
import { useKeyboardControls } from './useKeyboardControls';
import { HUD } from './HUD';
import { MobileControls } from './MobileControls';
import { InfoPanel } from './InfoPanel';
import { LoadingScreen } from './LoadingScreen';
import { AccessibleMode } from './AccessibleMode';
import type { PlayerControls } from './Player';

function GameInner() {
  const { setActivePanel, nearbyInteractable, paused, setPaused, loading } = useGame();
  const controlsRef = useRef<PlayerControls>({ move: { x: 0, y: 0 }, sprint: false, jump: false, interact: false });
  useKeyboardControls(controlsRef);
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglOk(false);
    } catch { setWebglOk(false); }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) setPaused(!paused);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [paused, setPaused, loading]);

  const handleInteract = () => { if (nearbyInteractable) setActivePanel(nearbyInteractable); };

  if (!webglOk) return <AccessibleMode />;

  return (
    <div className="fixed inset-0 bg-slate-950 overflow-hidden">
      <GameScene controlsRef={controlsRef} onInteract={handleInteract} />
      <HUD />
      <MobileControls controlsRef={controlsRef} onInteract={handleInteract} />
      <InfoPanel />
      <LoadingScreen />
      <AccessibleMode />
    </div>
  );
}

export function GameApp() {
  return <GameProvider><GameInner /></GameProvider>;
}
